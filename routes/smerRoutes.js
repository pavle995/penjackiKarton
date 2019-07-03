const mongoose = require("mongoose");

const Smer = mongoose.model("routes");


module.exports = app => {

	app.get("/api/smer", async (req, res) => {
  		var smer = await Smer.find({ime: req.query.ime})
  		console.log(smer)
  		res.send(smer)
  	});

	app.post(
	  "/api/smer", async (req, res) => {
	  	var newSmer = new Smer({
	  		masiv: req.body.masiv,
	  		stena: req.body.stena,
	  		ime: req.body.ime,
	  		prviPenjaci: req.body.prviPenjaci,
	  		datumPrPenjanjanja: req.body.datumPrPenjanjanja ? new Date(req.body.datumPrPenjanjanja.concat(" UTC")) : null,
	  		ocena: req.body.ocena,
	  		visina: req.body.visina,
	  		duzina: req.body.duzina,
	  		pristup: req.body.pristup,
	  		opis: req.body.opis,
	  		silaz: req.body.silaz,
	  		opisDao: req.body.opisDao,
	  		napomena: req.body.napomena,
	  		vrstaSmera: req.body.vrstaSmera,
	  		nvIzlaza: req.body.nvIzlaza,
	  	})

	  	const smer = await newSmer.save()

	  	res.send(smer)
	  }
	);

	app.put(
		"/api/smer", async (req, res) => {
			var smer = await Smer.findById(req.body.id)
			Object.keys(req.body).forEach(key => {
				if (key == 'id') {
					return;
				}
				smer.key = req.body[key]
				console.log(req.body[key])
				console.log(smer.key)
				console.log(smer)
			})
			console.log(smer)
			newSmer = await smer.save()
			res.send(newSmer)
		})
}
