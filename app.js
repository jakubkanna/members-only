const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
const isAuth = require("./lib/isAuthMiddleware").isAuth;

const mongoDb = process.env.DB_STRING;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Initialize Express app
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the 'public' folder to serve static files
app.use(express.static(path.join(__dirname, "public")));

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
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.session());

app.use(isAuth);

// Routes
app.use("/", require("./routes/index"));

// Start server
app.listen(3000, () => console.log(`App listening on port 3000!`));
