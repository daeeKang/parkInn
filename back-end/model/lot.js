const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LotSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: {type: Number, required: true},
    lotName: {type: String, default: null},
    spots: [{
        spotid: String,
        active: Boolean,
        unavailable: {type: Date, default: null},
        category: {type: String, default: 'general'},
        username: {type: String, default: null},
        reserveddates: [{
            starttime: {type: Date},
            endtime: {type: Date}
        }]
    }],
    totalSpots: Number,
    availableSpots: Number,
    peakTimes: [{
        hour: Number,
        count: Number,
    }],
    location: {
        latitude: Number, 
        longitude: Number,
    },
    img: {type: String, default: null},
});

LotSchema.methods.CreateTimeSlots = function(hours = 24){
    for(let i = 0; i < hours; i++){
        this.peakTimes.push({hour: i, count: 0});
    };
};

module.exports = mongoose.model('Lot', LotSchema, 'lots');