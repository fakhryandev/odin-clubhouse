var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/sign-up", userController.signUpGet);

module.exports = router;
