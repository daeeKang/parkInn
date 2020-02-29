const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LotSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: {type: Number, required: true},
    spots: [{
        spotid: String,
        active: Boolean,
        unavailable: Date,
        category: String,
    }],
    totalSpots: Number,
    availableSpots: Number,
    peakTimes: [{
        hour: Number,
        count: Number,
    }],
    location: {
        latitude: String, 
        longitude: String,
    },
});

LotSchema.methods.CreateTimeSlots = function(hours = 24){
    for(let i = 0; i < hours; i++){
        this.peakTimes.push({hour: i, count: 0});
    };
};

module.exports = mongoose.model('Lot', LotSchema, 'lots');