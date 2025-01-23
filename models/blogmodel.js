const mongoose = require("mongoose");

const blogModelSchema = new mongoose.Schema({
  title: String,
  author:String,
  description: String,
});
module.exports = mongoose.model("blog", blogModelSchema, "users");
