const passport = require("passport");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const genPassword = require("../lib/passwordUtils").genPassword;

//GET

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Home" });
});

exports.loginGet = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Login" });
});

exports.registerGet = asyncHandler(async (req, res, next) => {
  res.render("register", { title: "Register" });
});

exports.protectedRouteGet = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );
  } else {
    res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
    );
  }
});

exports.logoutGet = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/protected-route");
  });
});

exports.loginSuccessGet = asyncHandler(async (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

exports.loginFailureGet = asyncHandler(async (req, res, next) => {
  res.send("You entered the wrong password.");
});

//POST

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/login-success",
  failureRedirect: "/login-failure",
});

exports.registerPost = asyncHandler(async (req, res, next) => {
  console.log(User.findOne());
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  await newUser.save();
  return res.redirect("/login");
});
