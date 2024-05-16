var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

/**
 * -------------- POST ROUTES ----------------
 */

router.post("/login", userController.loginPost);

router.post("/register", userController.registerPost);

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", userController.index);

router.get("/login", userController.loginGet);

router.get("/register", userController.registerGet);

router.get("/protected-route", userController.protectedRouteGet);

router.get("/logout", userController.logoutGet);

router.get("/login-success", userController.loginSuccessGet);

router.get("/login-failure", userController.loginFailureGet);

module.exports = router;
