const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    companyid: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    lots: [Number],
    revenue: Number,
});

module.exports = mongoose.model('Company', CompanySchema);