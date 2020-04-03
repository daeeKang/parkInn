const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({

    

});

module.exports = mongoose.model('Reservation', ReservationSchema, 'reservations');