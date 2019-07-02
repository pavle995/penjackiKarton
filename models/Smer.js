const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const smerSchema = new Schema({
	masiv: {type: String, required: true},
	stena: {type: String, required: true},
	ime: {type: String, required: true},
	prviPenjaci: [String],
	datumPrPenjanja: Date,
	ocena: {type: String, required: true},
	visina: {type: Number, required: true},
	duzina: {type: Number, required: true},
	pristup: String,
	opis: String,
	silaz: String,
	opisDao: String,
	napomena: String
	/*
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
  salt: {type: String, required: true}/*/
});

const User = module.exports = mongoose.model("smerovi", smerSchema);