const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usponSchema = new Schema({
	datum: {type: Date, required: true},
	supenjaci: {type: [String], required: true},
	masiv: {type: String, required: true},
	stena: {type: String, required: true},
	imeSmera: {type: String, required: true},
	vremePenjanja: {type: String, required: true},
	predlogOcene: {type: String, required: true},
	vrstaSmera: {type: String, required: true},
	visinaSmera: {type: Number, required: true},
	nvIzlaza: Number,
	znacajnoPonavljanje: [String]
});

module.exports = mongoose.model("ascents", usponSchema);