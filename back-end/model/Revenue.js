const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subMonths = require('date-fns/subMonths');

let RevenueSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: Number,
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
});

RevenueSchema.statics.getLotRevenue = async function(companyid, lotid) {
    const data = await this.find({
        companyid: companyid,
        lotid: lotid,
    }, function(err, result) {
        if(err) throw err;
        return result;
    });
    if(data) return data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    return 0;
}

RevenueSchema.statics.getMonthCompanyRevenue = async function(companyid, monthAmount = 1){
    const data = await this.find({
        companyid: companyid,
        date: {$gte: subMonths(new Date(), monthAmount)},
    }, function(err, result) {
        if(err) throw err;
        return result;
    });
    if(data) return data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    return 0;
}

RevenueSchema.statics.getMonthLotRevenue = async function(companyid, lotid, monthAmount = 1) {
    const data = await this.find({
        companyid: companyid,
        lotid: lotid,
        date: {$gte: subMonths(new Date(), monthAmount)},
    }, function(err, result) {
        if(err) throw err;
        return result;
    });
    if(data) return data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
    }, 0);
    return 0;
}

module.exports = mongoose.model('Revenue', RevenueSchema, 'revenues');