const router = require('express').Router();
const model = require('../model/Model')

router.post('/AddLot', (req, res) => {
    const lot = new model.Lot({
      companyid: req.body.companyid,
      lotid: req.body.lotid,
      spots: req.body.spots
    });

    //if lotid exists for companyid already, give error
    const check = model.Lot.find({
      companyid: req.body.companyid,
      lotid: req.body.lotid
    })

    if(check.length != 0) return res.send('lot already exists my guy');
  
    lot.save().then(res => {
      console.log(res, `lot ${req.body.lotid} saved`);
    }).catch(err => {
      console.log(err);
    });
  
    return res.status(201).json({
      message: 'Handling post request',
      createdProduct: lot
    });
});

router.patch('/UpdateSpot', async (req, res) => {
  const lot = await model.Lot.find({
    companyid: req.body.companyid,
    lotid: req.body.lotid
  });


  if(lot.length == 0) return res.send('no lot found, btw change these error messages lmao');
  const spots = lot[0]["spots"]; //we are gauranteed that there is only one entry as lotid is unique
  
  let found = false; 
  spots.map(spot => {
    if(req.body.spotid == spot.spotid){
      spot["active"] = req.body.updateValue;
      found = true;
    }
    return spot;
  })

  if(found === false) return res.send('no spot found, btw change these error messages lmao');
  await model.Lot.findByIdAndUpdate(
    lot[0]["_id"], 
    {spots: spots},
    (err) => {
      if(err) {
        return res.send(err);
      } else {
        return res.send("Success, updated.");
      }
    })
})

router.get('/GetLots/:companyid', async (req, res) => { 
  const lots = await model.Lot.find({companyid: req.params.companyid});
  try{
      return res.send(lots);
  }
  catch(err){
      return res.status(500).send(err);
  }
});

router.get('/GetLot', async(req, res) => {
  const lot = await model.Lot.find({companyid: req.body.companyid, lotid: req.body.lotid});
  try{
    return res.send(lot);
  } catch(err) {
    return res.status(500).send(err);
  }
})

router.get('/GetParkingSpot', async(req, res) => {
  const lot = await model.Lot.find({companyid: req.body.companyid, lotid: req.body.lotid});
  
  //check if we found the lot
  if(lot.length == 0) return res.send('no lot found, btw change these error messages lmao');

  const spots = lot[0]["spots"]; //we are gauranteed that there is only one entry as lotid is unique
  
  let out; 
  spots.map(spot => {
    if(req.body.spotid == spot.spotid){
      out = spot;
    }
    return spot;
  })

  return res.send(out);
})

module.exports = router;