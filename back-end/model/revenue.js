const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Revenue', RevenueSchema, 'revenues');