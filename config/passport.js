//passport.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const validPassword = require("../lib/passwordUtils").validPassword;

const customFields = {
  usernameField: "email",
  passwordField: "pw",
};

const verifyCallback = asyncHandler(async (username, password, done) => {
  const user = await User.findOne({ username: username });

  if (!user) {
    return done(null, false);
  }

  const isValid = validPassword(password, user.hash, user.salt);

  if (isValid) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  asyncHandler(async (userId, done) => {
    const user = await User.findById(userId);
    done(null, user);
  })
);
