const express = require("express");
const router = express.Router();
const clubhouseController = require("../controllers/clubhouseController");

const authenticated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/");
};

router.get("/", clubhouseController.index);
router.post("/message", authenticated, clubhouseController.createMessage);

module.exports = router;
