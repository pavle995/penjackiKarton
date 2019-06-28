const mongoose = require("mongoose");
var crypto = require('crypto')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function(password) {
    var checkHash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === checkHash;
};

const User = module.exports = mongoose.model("users", userSchema);
