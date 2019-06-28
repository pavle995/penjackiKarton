const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys")

require("./models/User");
require("./services/passport.js");

const User = mongoose.model("users");

mongoose.connect(
  "mongodb://admin:admin995@ds241647.mlab.com:41647/penjacki_karton"
);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => res.send("Hello World!"));

require('./routes/userRoutes')(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
