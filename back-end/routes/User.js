const router = require('express').Router();
const model = require('../model/Model')

router.post('/AddUser', (req, res) => {
    
    

    const user = new model.User({
        username: req.body.username,
        role: req.body.role,
        first: req.body.first,
        last: req.body.last,
        companyid: req.body.companyid,
    });

    user.password = user.GenerateHash(req.body.password);

    user.save().then(res => {
      console.log(res, `user ${req.body.username} saved`);
    }).catch(err => {
      console.log(err);
    });
  
    res.status(201).json({
      message: 'Handling post request',
      createdProduct: user
    });
});

// router.get('/GetLots/:companyid', async (req, res) => {
    
//   const lots = await model.Lot.find({companyid: req.params.companyid});
//   try{
//       res.send(lots);
//   }
//   catch(err){
//       res.status(500).send(err);
//   }
// });

module.exports = router;