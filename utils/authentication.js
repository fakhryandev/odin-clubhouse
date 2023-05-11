const authenticated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/");
};

module.exports = { authenticated };
