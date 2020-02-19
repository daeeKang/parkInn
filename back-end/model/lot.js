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

module.exports = mongoose.model('Lot', LotSchema);