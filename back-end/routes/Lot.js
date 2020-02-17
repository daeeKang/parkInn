const router = require('express').Router();
const model = require('../model/Model')

router.post('/AddLot', (req, res) => {
    const lot = new model.Lot({
      companyid: req.body.companyid,
      lotid: req.body.lotid,
      spots: req.body.spots
    });
  
    lot.save().then(res => {
      console.log(res, `lot ${req.body.lotid} saved`);
    }).catch(err => {
      console.log(err);
    });
  
    res.status(201).json({
      message: 'Handling post request',
      createdProduct: lot
    });
});

module.exports = router;