const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LotSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: Number,
    spots: [{
        spotid: String,
        active: Boolean,
    }],
});

const Lot = mongoose.model('Lot', LotSchema);
module.exports = Lot;