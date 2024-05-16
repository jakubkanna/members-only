//passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) done(null, false);

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) done(null, user);
      else done(null, false);
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
