const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {
        givenName: {type: String, required: true},
        familyName: {type: String, requred: true},
    },
    status: {type: String, default: null},
    reservation: {type: Date, default: null}, 
    car: [{
        color: String,
        license: String,
        make: String,
        model: String,
    }],
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');