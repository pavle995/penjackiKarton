const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  console.log("Serialize:")
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialize1:")
  User.findById(id).then(user => {
    console.log("Deserialize:")
    console.log(user)
    done(null, user);
  });
});

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    function(username, password, done) {
      User.findOne({ username: username }).then(user => {
        if (user == null) {
          return done(null, false, { message: "Nepostojeći username" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Neispravna lozinka" });
        }
        return done(null, user);
      });
    }
  )
);
