const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "user");
