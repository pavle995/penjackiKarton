const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    function(username, password, done) {
      console.log("A da nije mongo");
      User.findOne({ email: email }).then(user => {
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
