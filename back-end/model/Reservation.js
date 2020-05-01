const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
    companyid: {type: String, required: true},
    lotid: {type: String, required: true},
    lotName: {type: String, required: true},
    spotid: {type: String, required: true},
    starttime: {type: Date, required: true},
    endtime: {type: Date, required: true},
    username: {type: String, required: true},
    expired: {type: Boolean, default: false}
});

module.exports = mongoose.model('Reservation', ReservationSchema, 'reservations');