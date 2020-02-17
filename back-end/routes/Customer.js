const router = require('express').Router();
const model = require('../model/Model')

console.log("we in customer");

router.post('/AddCustomer', (req, res) => {
    const customer = new model.Customer({
        username: req.body.username,
        first:  req.body.first,
        last: req.body.last,
        status: req.body.status,
        reservation: new Date(req.body.reservation),
        car: req.body.car
    });

    customer.save().then(res => {
        console.log(res, 'customer ${username} saved')
    }).catch(err => {
        console.log(err);
    });

    res.status(201).json({
        mesage: 'post request',
        createdProduct: customer
    });
});

module.exports = router;