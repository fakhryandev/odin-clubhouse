const express = require("express");
const router = express.Router();
const clubhouseController = require("../controllers/clubhouseController");
const { authenticated } = require("../utils/authentication");

router.get("/", clubhouseController.index);
router.post("/message", authenticated, clubhouseController.createMessage);
router.get("/join", authenticated, clubhouseController.joinMember);
router.get("/admin", authenticated, clubhouseController.becomeAdmin);

module.exports = router;
