const router = require("express").Router();
const model = require("../model/Model");
const checkJwt = require("../middleware/checkJwt");

router.post("/AddCompany", checkJwt, (req, res) => {
    console.log(req.body);
    const company = new model.Company({
        companyid: req.body.companyid,
        companyName: req.body.companyName,
    });

    company
        .save()
        .then((res) => {
            console.log(res, `company ${req.body.companyid} saved`);
        })
        .catch((err) => {
            console.log(err);
        });

    res.status(201).json({
        message: "Handling post request",
        createdProduct: company,
    });
});

router.get("/GetCompany/:companyName", checkJwt, async (req, res) => {
    const company = await model.Company.findOne({
        companyName: req.params.companyName,
    });
    console.log(company);
    if (company == null) {
        res.send("No company " + req.params.companyName + " found");
    } else {
        try {
            res.send(company);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

module.exports = router;
