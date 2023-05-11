var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { authenticated } = require("../utils/authentication");

router.post("/sign-up", authController.signUp);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
router.get("/logout", authController.logout);

router.get("/join", authenticated, authController.joinMember);

module.exports = router;
