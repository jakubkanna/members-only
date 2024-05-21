var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

/**
 * -------------- POST ROUTES ----------------
 */

router.post("/", userController.indexPost);

router.post("/login", userController.loginPost);

router.post("/register", userController.registerPost);

router.post("/membership", userController.membershipPost);

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", userController.index);

router.get("/login", userController.loginGet);

router.get("/register", userController.registerGet);

router.get("/logout", userController.logoutGet);

router.get("/login-success", userController.loginSuccessGet);

router.get("/login-failure", userController.loginFailureGet);

router.get("/membership", userController.membershipGet);

module.exports = router;
