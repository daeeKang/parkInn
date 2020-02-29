const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ParkingTimesSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: {type: Number, required: true},
    peakTimes: [{
        hour: Number,
        count: Number,
    }],
    date: {type: Date, required: true},
});

module.exports = mongoose.model('ParkingTimes', ParkingTimesSchema, 'parkingtimes');