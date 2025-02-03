const express = require("express");
const post = require("../middleware/post");
// const comment = require("../middleware/comment");
const User = require("../middleware/user");
const postController = require("../controllers/postcontroller");
const user = require("../middleware/user");
const postRouter = express.Router();
postRouter.post("/create", post.authenticateUser, postController.createPost);
postRouter.get("/get", postController.getPosts);
postRouter.get("/get/:id", postController.getPostById);
postRouter.put("/update/:id", postController.updatePost);
postRouter.delete(
  "/delete/:id",
  //   comment.authMiddleware,
  postController.deletePost
);
module.exports = postRouter;
