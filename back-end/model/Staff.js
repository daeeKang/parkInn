const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StaffSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {
        givenName: {type: String, required: true},
        familyName: {type: String, requred: true},
    },
    employeeid: String,
    companyid: {type: String, required: true},
    companyName: {type: String, required: true},
    admin: {type: Boolean, required: true},
});

module.exports = mongoose.model('Staff', StaffSchema, 'staffs');