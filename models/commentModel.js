const mongoose = require("mongoose");

const commentModelSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, 
    },
   
},
 { timestamps: true });
module.exports = mongoose.model("Comment", commentModelSchema, "Comments");