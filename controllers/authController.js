const { body, validationResult } = require("express-validator");

exports.signUp = [
  body("username")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Username must be at least 6 characters"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .withMessage("Confirm Password must be at least 8 characters")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) throw new Error("Password not match");
    }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return render();
  },
];
