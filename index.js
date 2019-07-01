const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys")
const expressSession = require('express-session')

require("./models/User");
require("./services/passport.js");

const User = mongoose.model("users");

console.log(keys.mongoURI)

mongoose.connect(
  keys.mongoURI
);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(expressSession({ secret: keys.sessionSecret, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => res.send("Hello World!"));

require('./routes/userRoutes')(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
