const router = require("express").Router();
const model = require("../model/Model");
const checkJwt = require("../middleware/checkJwt");

router.post("/AddStaff", checkJwt, (req, res) => {
    const staff = new model.Staff({
        username: req.body.username.toLowerCase(),
        name: {
            givenName: req.body.first,
            familyName: req.body.last,
        },
        employeeid: req.body.employeeid,
        companyid: req.body.companyid,
        companyName: req.body.companyName,
        admin: req.body.admin,
    });


    staff.save(function(err){
        if ( err && err.code !== 11000 ) {
            res.status(500).send(err);
            return;
        }
      
        //duplicate key
        if ( err && err.code === 11000 ) {
            res.status(500).send(err);
            return;
        }
        console.log(res, "staff member ${username} saved");
        res.status(201).json({
            mesage: "post request",
            createdProduct: staff,
        });
      });
});

router.get("/GetStaff/:username", checkJwt, async (req, res) => {
    const staff = await model.Staff.findOne({
        username: req.params.username,
    });
    try {
        res.send(staff);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
