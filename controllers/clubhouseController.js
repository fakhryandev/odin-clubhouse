const Message = require("../models/message");
const User = require("../models/user");

exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find().populate("author");

    res.render("index", { title: "Clubhouse", messages });
  } catch (error) {
    next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;

    const user = req.user;

    const newMessage = new Message({
      title,
      message,
      author: user._id,
    });

    await newMessage.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.joinMember = async (req, res, next) => {
  try {
    const userID = req.user._id;
    await User.findByIdAndUpdate(userID, { is_member: true });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.becomeAdmin = async (req, res, next) => {
  try {
    const userID = req.user._id;
    await User.findByIdAndUpdate(userID, { is_admin: true });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
