const passport = require("passport");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const genPassword = require("../lib/passwordUtils").genPassword;
const Message = require("../models/Message");

//GET

exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate("user").exec();
  res.render("index", { title: "Home", messages: messages, user: req.user });
});

exports.loginGet = asyncHandler(async (req, res, next) => {
  req.isAuthenticated()
    ? res.redirect("/login-success")
    : res.render("login", { title: "Login" });
});

exports.registerGet = asyncHandler(async (req, res, next) => {
  res.render("register", { title: "Register" });
});

exports.logoutGet = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.loginSuccessGet = asyncHandler(async (req, res, next) => {
  res.send('<p>You successfully logged in. <a href="/">Home</a></p>');
});

exports.loginFailureGet = asyncHandler(async (req, res, next) => {
  res.send("You entered the wrong password.");
});

exports.membershipGet = asyncHandler(async (req, res, next) => {
  if (!res.locals.isAuth) {
    return res.status(401).json({ msg: "Please login to see the content." });
  } else {
    res.render("membership", { title: "Membership", user: req.user });
  }
});

//POST

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/login-success",
  failureRedirect: "/login-failure",
});

exports.registerPost = asyncHandler(async (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const membership = req.body.membership === "yes" ? true : false;

  const newUser = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    hash: hash,
    salt: salt,
    membership: membership,
  });

  await newUser.save();

  res.send(
    `<p>You have been registred successfully. Your username is: <b>${newUser.username}</b></p> <a href='/login'> Login </a>`
  );
});

exports.indexPost = asyncHandler(async (req, res, next) => {
  const newMessage = new Message({
    title: req.body.title,
    text: req.body.text,
    user: req.user._id,
  });
  await newMessage.save();

  res.redirect("/");
});

exports.membershipPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (user.membership) {
    return res.redirect("/membership");
  }

  if (req.body.code === "SECRET CODE") {
    user.membership = true;
    await user.save();
    return res.send(
      "<p>Membership activated successfully.</p> <a href=" / ">Home</a></p>"
    );
  } else {
    return res.send("Wrong code, try again.");
  }
});
