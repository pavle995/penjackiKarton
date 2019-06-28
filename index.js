const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./models/User");
require("./services/passport.js");

const User = mongoose.model("users");

mongoose.connect(
  "mongodb://admin:admin995@ds241647.mlab.com:41647/penjacki_karton"
);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: "testCookieKey"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/current_user", async (req, res) => {
  res.send(req.user);
});

app.post(
  "/login",
  passport.authenticate('local'),
  function(req, res){
    console.log("body parsing", req.body)
    res.send(req.user)
  }
);

app.post('/auth',passport.authenticate('local'), function(req, res){
  console.log("body parsing", req.body);
  //should be something like: {username: YOURUSERNAME, password: YOURPASSWORD}
});

app.post("/signup", async (req, res, next) => {
  console.log(req.body)
  let newUser = new User({username: req.body.name, email: req.body.email});

  newUser.setPassword(req.body.password)

  const user = await newUser.save()

  res.send(user)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
