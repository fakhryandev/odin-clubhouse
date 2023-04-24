const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: 8,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: 10,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
