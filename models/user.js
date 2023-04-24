const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    minLength: 1,
    maxLength: 20,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    minLength: 1,
    maxLength: 20,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    minLength: 6,
    maxLength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
  },
  is_member: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
