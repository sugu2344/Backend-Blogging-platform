const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" }, // Added bio field
  role: { type: String, enum: ["admin", "user"], default: "user" },
   profilePicture: String,
  socialLinks: {
    twitter: String,
    linkedin: String,
    github: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema, "users");
