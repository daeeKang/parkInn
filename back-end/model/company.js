const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    companyid: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    lotids: [Number],
    statistic: {
        loadCapacity: Number,
        averageTimeParked: Number, 
    },
});

module.exports = mongoose.model('Company', CompanySchema, 'companies');