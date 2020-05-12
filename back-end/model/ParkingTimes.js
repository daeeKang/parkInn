const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subDays = require('date-fns/subDays');

let ParkingTimesSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: {type: Number, required: true},
    peakTimes: [{
        hour: Number,
        count: Number,
    }],
    date: {type: Date, required: true},
});

ParkingTimesSchema.statics.YesterdaysPeakTimes = async function(companyid, lotid){
    const today = new Date('05-06-2020'); //TO DO: Take out hard coded date and grab current date
    let times = await this.findOne({
        companyid: companyid,
        lotid: lotid,
        date: {
            $gte: subDays(today, 1).toISOString(),
            $lt: today.toISOString(),
        }
    }, function(err, result) {
        if (err) throw err;
        return result;
    });
    return {times: times.peakTimes, date: times.date};
};  

module.exports = mongoose.model('ParkingTimes', ParkingTimesSchema, 'parkingtimes');