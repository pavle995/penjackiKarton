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
	napomena: String,
	slika: { data: Buffer, contentType: String },
	vrstaSmera: String,
	nvIzlaza: Number
});

module.exports = mongoose.model("routes", smerSchema);