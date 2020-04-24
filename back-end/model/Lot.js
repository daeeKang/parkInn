const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geolib = require('geolib');

let LotSchema = new Schema({
    companyid: { type: String, required: true },
    lotid: { type: Number, required: true },
    lotName: { type: String, default: null },
    spots: [
        {
            spotid: String,
            active: Boolean,
            unavailable: { type: Date, default: null },
            category: { type: String, default: "general" },
            username: { type: String, default: null },
            reserveddates: [{
                starttime: {type: Date},
                endtime: {type: Date}
            }]
        }
    ],
    totalSpots: Number,
    availableSpots: Number,
    averageTimeParked: {
        currentAverage: { type: Number, default: 0 },
        totalCount: { type: Number, default: 0 },
    },
    peakTimes: [
        {
            hour: Number,
            count: Number
        }
    ],
    location: {
        latitude: Number,
        longitude: Number
    },
    lotDesign: String,
    imgURL: { type: String, default: null }
});

LotSchema.methods.CreateTimeSlots = function(hours = 24) {
    for (let i = 0; i < hours; i++) {
        this.peakTimes.push({ hour: i, count: 0 });
    }
};

LotSchema.statics.findByLocation = async function(location, radius){  
    const lots = await this.find({}, 
        function(err, result) {
        if (err) throw err;
        return result;
    });
    return lots.filter(lot => geolib.isPointWithinRadius(lot.location, location, radius*1609.34));
}

module.exports = mongoose.model("Lot", LotSchema, "lots");
