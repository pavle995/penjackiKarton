const mongoose = require("mongoose");

const Uspon = mongoose.model("ascents");

module.exports = app => {

	app.get("/api/uspon", async (req, res) => {
  		var uspon = await Uspon.findById(req.query.id)
  		res.send(uspon)
  	});

	app.post(
	  "/api/uspon", async (req, res) => {
	  	var newUspon = new Uspon({
	  		datum: new Date(req.body.datum.concat(" UTC")),
	  		supenjaci: req.body.supenjaci,
	  		masiv: req.body.masiv,
	  		stena: req.body.stena,
	  		imeSmera: req.body.imeSmera,
	  		vremePenjanja: req.body.vremePenjanja,
	  		predlogOcene: req.body.predlogOcene,
	  		vrstaSmera: req.body.vrstaSmera,
	  		visinaSmera: req.body.visinaSmera,
	  		nvIzlaza: req.body.nvIzlaza,
	  		znacajnoPonavljanje: req.body.znacajnoPonavljanje
	  	})

	  	const uspon = await newUspon.save()

	  	res.send(uspon)
	  }
	);

	app.put(
		"/api/uspon", async (req, res) => {
			var uspon = await Uspon.findById(req.body.id)
			Object.keys(req.body).forEach(key => {
				if (key == 'id') {
					return;
				}
				uspon[key] = req.body[key]
			})
			newUspon = await uspon.save()
			res.send(newUspon)
		})

	app.delete("/api/uspon", async (req, res) => {
		var uspon = await Uspon.deleteOne({_id: req.body.id})
		res.send(uspon)
	})
}