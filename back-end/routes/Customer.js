const router = require("express").Router();
const model = require("../model/Model");
const checkJwt = require("../middleware/checkJwt");

router.post("/AddCustomer", checkJwt, (req, res) => {
    const customer = new model.Customer({
        username: req.body.username,
        name: {
            givenName: req.body.first,
            familyName: req.body.last,
        },
        status: req.body.status,
        reservation: new Date(req.body.reservation),
        car: req.body.car,
    });

    customer
        .save()
        .then((res) => {
            console.log(res, "customer ${username} saved");
        })
        .catch((err) => {
            console.log(err);
        });

    res.status(201).json({
        mesage: "post request",
        createdProduct: customer,
    });
});

router.get("/GetCustomers", checkJwt, async (req, res) => {
    const customers = await model.Customer.find({});
    console.log(customers);
    try {
        res.send(customers);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/GetCustomer/:username", checkJwt, async (req, res) => {
    const customer = await model.Customer.findOne({
        username: req.params.username,
    });
    try {
        res.send(customer);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
