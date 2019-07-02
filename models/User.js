const mongoose = require("mongoose");
var crypto = require('crypto')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  ime: {type: String, required: true},
  prezime: {type: String, required: true},
  plDrustvo: {type: String, required: true},
  datumRodjenja: {type: Date, required: true},
  datumPocetniLetnjiKurs: Date,
  datumPocetniZimskiKurs: Date,
  datumNapredniLetnjiKurs: Date,
  datumNapredniZimskiKurs: Date,
  odsek: {type: String, required: true},
  datumZvanjaAlpiniste: Date,
  datumZvanjaInstruktora: Date,
  email: {type: String, required: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true}
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

