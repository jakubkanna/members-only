const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();

// Database connection
const mongoDb = process.env.DB_STRING;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Passport configuration
require("./config/passport");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/index"));

// Start server
app.listen(3000, () => console.log(`App listening on port 3000!`));
