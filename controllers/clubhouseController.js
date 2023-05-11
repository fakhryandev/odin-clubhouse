const Message = require("../models/message");

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
