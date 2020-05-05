const router = require('express').Router();
const model = require('../model/Model');
const checkJwt = require("../middleware/checkJwt");
//TO DO: Protect Route After Login is Setup for all applications

// welcome to mom's spaghetti all over the code already
router.post('/AddReservation', async (req, res) => {
    const reservation = new model.Reservation({
        companyid: req.body.companyid,
        lotid: req.body.lotid,
        lotname: req.body.lotname,
        spotid: req.body.spotid,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        username: req.body.username,
        expired: req.body.expired
    });
    // this will collect all the errors that will inevitably occur
    let err = "";

    // if the end is before the start you're probably in a DeLorean
    if(reservation.starttime.getTime() - reservation.endtime.getTime() >= 0){
        err = "Invalid reservation time ";
    }

    // get the company and lot and see if they exist
    const Company = await model.Company.find({companyid: reservation.companyid });
    const Lot = await model.Lot.find({companyid: reservation.companyid, lotid: reservation.lotid});
    if(Company == null){
        err += "Company not found ";
    }
    if(Lot.length == 0){
        err += "Lot not found ";
    }

    // get the spots array
    const spots = Lot[0]["spots"];

    // get the specific spot in the array by the id
    var spot = spots.find(element => element.spotid == reservation.spotid);

    var conflict = false;

    if(spot == null){
        err += "Spot not found. spotid not valid";
    }
    else{
        // see if there are any other reservations already made that conflict with the one you're tryna save
        spot.reserveddates.forEach(element => {
            if((reservation.starttime >= element.starttime && reservation.starttime <= element.endtime) 
                || (reservation.endtime >= element.starttime && reservation.endtime <= element.endtime)){
                    conflict = true;
                }
        });
    }


    if(conflict){
        err += "Selected time conflicts with already scheduled reservations";
    }

    // if this is more than 0 there was 1 (or more) no no's
    if(err.length > 0){
        res.send(err);
    }
    else{
        // update the array that is a field in the schema using 
        // mongoose weird $ syntax
        // this hurt my brain
        await model.Lot.update(
            {
                // find a Lot with these properties 
                companyid: req.body.companyid,
                lotid: req.body.lotid,
                'spots.spotid': req.body.spotid
            },
            {
                // add to the array of the spot with the same spotid the reservation
                $addToSet:{
                    'spots.$.reserveddates' : {
                        _id: reservation.id,
                        starttime: req.body.starttime,
                        endtime : req.body.endtime
                    }
                }
            },
            null,
            (err) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("updated spot availability");
                }
            }
        );

        // save the actual reservation
        await reservation.save().then(res =>{
        }).catch(err =>{
            console.log(err);
        });
        res.send("success");
    }

});

router.get('/GetReservations/:username', async (req, res) => {
    // get reservations by customer's username
    let customerReservations = await model.Reservation.find({username: req.params.username});
    // if it comes back empty, then they got no reservations
    if(customerReservations.length == 0){
        return res.send("No reservations found for customer");
    }
    else{
       try{
            // else send the list of reservations
           res.send(customerReservations);
       } 
       catch(err){
           res.status(500).send(err);
       }
    }
});

router.delete('/CancelReservation/:reservationid', async (req, res) => {
    try{
        //find the reservation
        let res = await model.Reservation.findById(req.params.reservationid);

        // remove that reservation time from the lot's spot's array
        await model.Lot.update(
            {
                companyid: res.companyid,
                lotid: res.lotid,
                'spots.spotid': res.spotid
            },
            {
                // in the spot, find in it's reservations array the datetime wrapper object that has the same start and end time
                'spots.$.reserveddates': {
                     $pull: {
                        starttime: res.starttime,
                        endtime : res.endtime
                    }
                }
            },
            null,
            (err) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("updated spot availability");
                }
            }
        )
        
        // find the actual reservation and delete it
        await model.Reservation.findByIdAndDelete(req.params.reservationid);
    } catch(err){
        res.send("Error cancelling reservation");
    }

    res.send("reservation successfully cancelled");

    

});

module.exports = router;