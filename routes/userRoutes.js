const passport = require('passport');

module.exports = app => {

	app.get("/api/current_user", async (req, res) => {
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
	  let newUser = new User({username: req.body.name, email: req.body.email});

	  newUser.setPassword(req.body.password)

	  const user = await newUser.save()

	  res.send(user)
	})

	app.get('/api/logout', (req, res) => {
    	req.logout();
    	res.redirect('/');
  });
}