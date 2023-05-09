const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signUp = async (req, res, next) => {
  try {
    const { password, username, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    await user.save();
  } catch (error) {
    next(error);
  }
};
