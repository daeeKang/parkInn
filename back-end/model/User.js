const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    name: {
        givenName: {type: String, required: true},
        familyName: {type: String, requred: true},
    },
    companyid: {type: String, default: null},
});

UserSchema.methods.GenerateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.ValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'users'); 