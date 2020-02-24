const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    companyid: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    lots: [Number],
    revenue: [{
        amount: Number,
        date: Date,
    }],
    statistic: {
        loadCapacity: Number,
        averageTimeParked: Number, 
    },
});

module.exports = mongoose.model('Company', CompanySchema);