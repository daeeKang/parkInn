const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    companyid: {type: String, required: true, unique: true},
    companyName: {type: String, required: true},
    lots: [Number],
    revenue: Number,
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;