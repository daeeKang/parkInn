const router = require('express').Router();
const model = require('../model/Model');
const checkJwt = require("../middleware/checkJwt");
//TO DO: Protect Route After Login is Setup for all applications

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
    console.log(reservation.starttime.getTime());
    console.log(reservation.endtime.getTime());
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
    let spots = Lot[0]["spots"];

    let found = false; 
    spots.map(spot => {
      if(req.body.spotid == spot.spotid){
        spot["active"] = req.body.updateValue;
        found = true;
      }
      return spot;
    });

    if(found === false){
        err += "spotid not found";
    }

    await model.Lot.findByIdAndUpdate(
        Lot[0]["_id"], 
        {spots: spots},
        (err) => {
          if(err) {
            return res.send(err);
          }
    });

    if(err.length > 0){
        res.send(err);
    }
    else{
        await reservation.save().then(res =>{
            console.log("success???");
        }).catch(err =>{
            console.log(err);
        });
    }
});

module.exports = router;