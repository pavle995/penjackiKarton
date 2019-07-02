const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin')
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {

	app.get("/api/current_user", requireLogin, async (req, res) => {
  		res.send(req.user);
	});

	app.post(
	  "/login",
	  passport.authenticate('local', { failureRedirect: '/login' }),
	  function(req, res){
	    res.send('Uspesno')
	  }
	);

	app.post('/auth', function(req, res){
	  console.log("body parsing", req.body);
	  //should be something like: {username: YOURUSERNAME, password: YOURPASSWORD}
	});

	app.post("/signup", async (req, res, next) => {
	  console.log(new Date(req.body.datumRodjenja.concat(" UTC")))
	  let newUser = new User({
	  	ime: req.body.ime,
	  	prezime: req.body.prezime,
	  	plDrustvo: req.body.plDrustvo,
	  	datumRodjenja: new Date(req.body.datumRodjenja.concat(" UTC")),
	  	datumPocetniLetnjiKurs: req.body.datumPocetniLetnjiKurs ? new Date(req.body.datumPocetniLetnjiKurs.concat(" UTC")) : null,
	  	datumPocetniZimskiKurs: req.body.datumPocetniZimskiKurs ? new Date(req.body.datumPocetniZimskiKurs.concat(" UTC")) : null,
	  	datumNapredniLetnjiKurs: req.body.datumNapredniLetnjiKurs ? new Date(req.body.datumNapredniLetnjiKurs.concat(" UTC")) : null,
	  	datumNapredniZimskiKurs: req.body.datumNapredniZimskiKurs ? new Date(req.body.datumNapredniZimskiKurs.concat(" UTC")) : null,
	  	odsek: req.body.odsek,
	  	datumZvanjaAlpiniste: req.body.datumZvanjaAlpiniste ? new Date(req.body.datumZvanjaAlpiniste.concat(" UTC")) : null,
	  	datumZvanjaInstruktora: req.body.datumZvanjaInstruktora ? new Date(req.body.datumZvanjaInstruktora.concat(" UTC")) : null, 
	  	email: req.body.email
	  });
	  console.log(newUser)

	  newUser.setPassword(req.body.password)
	  console.log("setovan pass")

	  const user = await newUser.save()
	  console.log("sacuvan u bazi")

	  res.send(user)
	})

	app.get('/api/logout', requireLogin, (req, res) => {
    	req.logout();
    	res.redirect('/');
  });
}
