const express = require("express");
const router = express.Router();
const clubhouseController = require("../controllers/clubhouseController");

router.get("/", clubhouseController.index);

module.exports = router;
