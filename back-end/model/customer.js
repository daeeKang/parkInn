const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    username: {type: String, required: true, unique: true},
    first: {type: String, required: true},
    last: {type: String, requred: true},
    status: String,
    reservation: Date, 
    car: [{
        color: String,
        license: String,
    }],
});

module.exports = mongoose.model('Customer', CustomerSchema);