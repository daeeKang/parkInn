const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RevenueSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: Number,
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
});

module.exports = mongoose.model('Revenue', RevenueSchema, 'revenues');