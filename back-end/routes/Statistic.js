const router = require("express").Router();
const model = require("../model/Model");
const checkJwt = require("../middleware/checkJwt");
//TO DO: Protect Route After Login is Setup for all applications

router.get("/:companyName", async (req, res) => {
    const lotStatistics = [];
    const company = await model.Company.findOne({
        companyName: req.params.companyName,
    });
    if (company == null) {
        res.send("No company " + req.params.companyName + " found");
    } else {
        try {
            let companyStatistics = {
                availableSpots: 0,
                totalSpots: 0,
                peakTimes: [],
                averageTimeParked: {
                  currentAverage: 0,
                  totalCount: 0,  
                },
                revenue: 0,
            };
            for(let i = 0; i < 24; i++)
                companyStatistics.peakTimes.push({hour: i, count: 0});
            //Grab statistics for each lot
            for(let i = 0; i < company.lotids.length ; i+=1){
                const lot = await model.Lot.findOne({
                    companyid: company.companyid,
                    lotid: company.lotids[i],
                });
                const lotStatistic = {
                    lotid: lot.lotid,
                    availableSpots: lot.availableSpots,
                    totalSpots: lot.totalSpots,
                    peakTimes: await model.ParkingTimes.YesterdaysPeakTimes(company.companyid, company.lotids[i]),
                    averageTimeParked: lot.averageTimeParked,
                    revenue: await model.Revenue.getLotRevenue(company.companyid, company.lotids[i]),
                };
                //Calculate statistics for company
                companyStatistics.availableSpots += lotStatistic.availableSpots;
                companyStatistics.totalSpots += lotStatistic.totalSpots;
                companyStatistics.peakTimes.map(times => times.count += lotStatistic.peakTimes.times[times.hour].count);
                companyStatistics.averageTimeParked = {
                    currentAverage: (companyStatistics.averageTimeParked.currentAverage * companyStatistics.averageTimeParked.totalCount + lotStatistic.averageTimeParked.currentAverage * lotStatistic.averageTimeParked.totalCount) / (companyStatistics.averageTimeParked.totalCount + lotStatistic.averageTimeParked.totalCount),
                    totalCount: companyStatistics.averageTimeParked.totalCount + lotStatistic.averageTimeParked.totalCount,
                }
                companyStatistics.revenue += lotStatistic.revenue; 
                lotStatistics.push(lotStatistic);
            }
            const statistics = {
                lotStatistics,
                companyStatistics
            }
            res.send(statistics);
        } catch (err) {
            console.log(err);        
            res.status(500).send(err);
        }
    }
});

router.get("/:companyName/:lotid", async (req, res) => {
    const company = await model.Company.findOne({
        companyName: req.params.companyName,
    });
    if (company == null) {
        res.send("No company " + req.params.companyName + " found");
    } else {
        try {
            const lot = await model.Lot.findOne({
                companyid: company.companyid,
                lotid: req.params.lotid,
            });
            const lotStatistic = {
                lotid: lot.lotid,
                availableSpots: lot.availableSpots,
                totalSpots: lot.totalSpots,
                peakTimes: await model.ParkingTimes.YesterdaysPeakTimes(company.companyid, req.params.lotid),
                averageTimeParked: lot.averageTimeParked,
                revenue: await model.Revenue.getLotRevenue(company.companyid, req.params.lotid),
            };
            res.send(lotStatistic);
        } catch (err) {
            console.log(err);        
            res.status(500).send(err);
        }
    }
});

router.get("/GetMonthRevenue/:companyName/:amountMonth", async (req, res) => {
    const company = await model.Company.findOne({
        companyName: req.params.companyName,
    });
    if (company == null) {
        res.send("No company " + req.params.companyName + " found");
    } else {
        try {
            const revenue = await model.Revenue.getMonthCompanyRevenue(company.companyid, req.params.amountMonth);
            res.send(String(revenue));
        } catch (err) {
            console.log(err);        
            res.sendStatus(500);
        }
    }
});

router.get("/GetMonthRevenue/:companyName/:lotid/:amountMonth", async (req, res) => {
    const company = await model.Company.findOne({
        companyName: req.params.companyName,
    });
    if (company == null) {
        res.send("No company " + req.params.companyName + " found");
    } else {
        try {
            const revenue = await model.Revenue.getMonthLotRevenue(company.companyid, req.params.lotid, req.params.amountMonth);
            res.send(String(revenue));
        } catch (err) {
            console.log(err);        
            res.sendStatus(500);
        }
    }
});

module.exports = router;