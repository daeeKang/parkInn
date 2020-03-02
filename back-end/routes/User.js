const router = require('express').Router();
const model = require('../model/Model')
const {check, validationResult } = require('express-validator');

router.post('/AddUser', [
    check('username').isEmail(), 
    check('password').isLength({min: 5}).withMessage("must be at least 5 characters long")
                     .matches(/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/).withMessage("Does not match this regex that Will gave me lol")
    ], 
    (req, res) => {
        
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()});
    }

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

router.get('/GetUser', async (req, res) => {

    const userData = await model.User.findOne({username: req.body.username});

    try{
        if(userData.ValidPassword(req.body.password)){
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