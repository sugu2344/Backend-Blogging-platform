const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPassword: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userModelSchema, "users");
