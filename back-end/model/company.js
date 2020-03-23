const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    companyid: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    lotids: [Number],
    statistic: {
        loadCapacity: {type: Number, default: 0},
        averageTimeParked: {type: Number, default: 0},
    },
});

module.exports = mongoose.model('Company', CompanySchema, 'companies');