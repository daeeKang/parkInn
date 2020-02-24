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

router.get('/GetUser/:username/:password', async (req, res) => {

    const userData = await model.User.findOne({username: req.params.username});

    try{
        if(userData.ValidPassword(req.params.password)){
            res.send(userData);
        }
        else{
            res.status(401).send({rtnCode: 1});        
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});

module.exports = router;