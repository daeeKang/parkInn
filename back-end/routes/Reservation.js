const router = require('express').Router();
const model = require('../model/Model');

router.post('/AddReservation', async (req, res) => {
    const reservation = new model.Reservation({
        companyid: req.body.companyid,
        lotid: req.body.lotid,
        spotid: req.body.spotid,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        username: req.body.username,
        expired: req.body.expired
    });
    let err = "";
    if(reservation.starttime.getTime() - reservation.endtime.getTime() >= 0){
        err = "Invalid reservation time ";
    }
    const Company = await model.Company.find({companyid: reservation.companyid });
    const Lot = await model.Lot.find({companyid: reservation.companyid, lotid: reservation.lotid});
    if(Company == null){
        err += "Company not found ";
    }
    if(Lot.length == 0){
        err += "Lot not found ";
    }
    const spots = Lot[0]["spots"];

    console.log("spot id is " + req.body.spotid);

    let found = false;

    await model.Lot.findOneAndUpdate(
        {
            companyid: req.body.companyid,
            lotid: req.body.lotid,
            'spots.spotid': req.body.spotid
        },
        {
            $push:{
                'spots.$.reserveddates' : {
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
    )

    if(err.length > 0){
        res.send(err);
    }
    else{
        await reservation.save().then(res =>{
        }).catch(err =>{
            console.log(err);
        });
    }

    res.send("success");

});

router.get('/GetReservations/:username', async (req, res) => {
    let customerReservations = await model.Reservation.find({username: req.params.username});
    if(customerReservations.length == 0){
        console.log("1");
        return res.send("No reservations found for customer");
    }
    else{
       try{
           console.log("2");
           res.send(customerReservations);
       } 
       catch(err){
           console.log("asedfsdf");
           res.status(500).send(err);
       }
    }
});


module.exports = router;