const router = require('express').Router();
const model = require('../model/Model');
const checkJwt = require('../middleware/checkJwt');

router.post('/AddStaff', checkJwt, (req, res) => {
    const staff = new model.Staff({
        username: req.body.username,
        name: {
            givenName: req.body.first,
            familyName: req.body.last,
        },
        employeeid: req.body.employeeid,
        companyid: req.body.companyid,
        admin: req.body.admin
    });

    customer.save().then(res => {
        console.log(res, 'staff member ${username} saved')
    }).catch(err => {
        console.log(err);
    });

    res.status(201).json({
        mesage: 'post request',
        createdProduct: staff
    });
});

module.exports = router;