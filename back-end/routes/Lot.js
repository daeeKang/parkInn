const router = require("express").Router();
const model = require("../model/Model");
const checkJwt = require("../middleware/checkJwt");
//TO DO: Protect Route After Login is Setup for all applications

router.post("/AddLot", checkJwt, async (req, res) => {
    const lot = new model.Lot({
        companyid: req.body.companyid,
        lotid: req.body.lotid,
        lotName: req.body.lotName,
        spots: req.body.spots,
        totalSpots: req.body.spots.length,
        availableSpots: req.body.spots.length, //initially everything is availale
        location: {
            latitude: req.body.lat,
            longitude: req.body.long,
        },
    });
    //if lotid exists for companyid already, give error
    const check = await model.Lot.find({
        companyid: req.body.companyid,
        lotid: req.body.lotid,
    });

    if (check.length != 0) return res.send("lot already exists my guy");

    await lot
        .save()
        .then((res) => {
            console.log(res, `lot ${req.body.lotid} saved`);
        })
        .catch((err) => {
            console.log(err);
        });

    return res.status(201).json({
        message: "Handling post request",
        createdProduct: lot,
    });
});

router.post("/UpdateLotDesign", async (req, res) => {
    let spots = [];

    console.log(req.body.parkingLabel)
    req.body.parkingLabel.map((label) => {
        spots.push({
            unavailable: null,
            category: "general",
            usernane: null,
            spotid: label.text,
            active: true
        })
    })

    await model.Lot.findOneAndUpdate(
        {
            companyid: req.body.companyid,
            lotid: req.body.lotid,
        },
        {
            lotDesign: req.body.design,
            spots: spots
        }
    );
    console.log("dab");
    


    res.send(
        await model.Lot.findOne({
            companyid: req.body.companyid,
            lotid: req.body.lotid,
        })
    );
});

router.get("/GetLotDesign/:companyid/:lotid", async (req, res) => {
    console.log(req.params); 
    let found = await model.Lot.findOne({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });
    console.log(found);
    res.send(found.lotDesign);
});

//TODO- Fix this shit
router.post("/UpdatePeakTimes", checkJwt, async (req, res) => {
    await model.Lot.findOneAndUpdate(
        {
            companyid: req.body.companyid,
            lotid: req.body.lotid,
        },
        {
            peakTimes: req.body.peakTimes,
        }
    );

    res.send(
        model.Lot.findOne({
            companyid: req.body.companyid,
            lotid: req.body.lotid,
        })
    );
});

router.patch("/UpdateSpot", checkJwt, async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.body.companyid,
        lotid: req.body.lotid,
    });

    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");
    const spots = lot[0]["spots"]; //we are gauranteed that there is only one entry as lotid is unique

    let found = false;
    spots.map((spot) => {
        if (req.body.spotid == spot.spotid) {
            spot["active"] = req.body.updateValue;
            found = true;
        }
        return spot;
    });

    if (found === false)
        return res.send("no spot found, btw change these error messages lmao");
    await model.Lot.findByIdAndUpdate(
        lot[0]["_id"],
        { spots: spots },
        (err) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send("Success, updated.");
            }
        }
    );
});

router.get("/GetLots/:companyid", checkJwt, async (req, res) => {
    const lots = await model.Lot.find({ companyid: req.params.companyid });
    try {
        let lotsWithCompanyName = await addCompanyNameToLots(lots);
        return res.send(lotsWithCompanyName);
    } 

    catch (err) {
        return res.status(500).send(err);
    }
});

router.get("/GetAllSpots/:companyid/:lotid", checkJwt, async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    res.send(lot[0].spots);
});

router.get("/GetParkingSpot/:companyid/:lotid", checkJwt, async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    //check if we found the lot
    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    const spots = lot[0]["spots"]; //we are gauranteed that there is only one entry as lotid is unique

    let out;
    spots.map((spot) => {
        if (req.body.spotid == spot.spotid) {
            out = spot;
        }
    });
});

router.get("/GetLot/:companyid/:lotid", async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    let lotsWithCompanyName = await addCompanyNameToLots(lot);
    return res.send(lotsWithCompanyName[0]);
});

router.get("/GetAllSpots/:companyid/:lotid", async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    res.send(lot[0].spots);
});

router.get("/GetPeakTimes/:companyid/:lotid", checkJwt, async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    //check if we found the lot
    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    const spots = lot[0]["spots"]; //we are gauranteed that there is only one entry as lotid is unique

    let out;
    spots.map((spot) => {
        if (req.body.spotid == spot.spotid) {
            out = spot;
        }
        return spot;
    });

    return res.send(out);
});

router.get("/GetPeakTimes/:companyid/:lotid", async (req, res) => {
    const lot = await model.Lot.find({
        companyid: req.params.companyid,
        lotid: req.params.lotid,
    });

    if (lot.length == 0)
        return res.send("no lot found, btw change these error messages lmao");

    res.send(lot[0].peakTimes);
});

router.get("/GetLotsWithinArea/:latitude/:longitude/:radius", async (req, res) => {
    const location = {
        latitude: req.params.latitude,
        longitude: req.params.longitude,
    }
    const lots = await model.Lot.findByLocation(location, req.params.radius);

    let lotsWithCompanyName = await addCompanyNameToLots(lots);

    res.send(lotsWithCompanyName);
});

router.get("/SearchForLot/:lotname", async (req, res) => {
    const lots = await model.Lot.find({
        lotName: { $regex : new RegExp(req.params.lotname.replace(/\-/g, ' '), "i") },
    });

    let lotsWithCompanyName = await addCompanyNameToLots(lots);

    res.send(lotsWithCompanyName);
});

async function getCompany(cid){
    try{
        let c = await model.Company.find({companyid: cid});
        return c;
    }
    
    catch(err){
        console.log(err);
    }
}


// takes in Lot schemas, turns them into plain javascript objects, adds company name to each lot
async function addCompanyNameToLots(lots){
    lotsWithCompanyName = [];

    for(let i = 0; i < lots.length; i++){
        let temp = lots[i].toObject();
        let company = await getCompany(temp.companyid);
        let companyObj = company[0].toObject();
        temp.companyname = companyObj.companyName;
        lotsWithCompanyName.push(temp);
    }
    return lotsWithCompanyName;
}

module.exports = router;
