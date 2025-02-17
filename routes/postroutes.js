const express = require("express");
const post = require("../middleware/post");

const User = require("../middleware/user");
const postController = require("../controllers/postcontroller");
const user = require("../middleware/user");
const postRouter = express.Router();
postRouter.post("/create", post.authenticateUser, postController.createPost);
postRouter.get("/get", postController.getPosts);
postRouter.get("/get/:id", postController.getPostById);
postRouter.put("/update/:id", post.authenticateUser, postController.updatePost);
postRouter.delete(
  "/delete/:id",
  
  postController.deletePost
);
postRouter.get("/user/:userId", postController.getPostsByUser);
postRouter.get("/post/categories", postController.getCategories);
postRouter.get("/post/tags", postController.getTags);
postRouter.get(
  "/currentuser",
  post.authenticateUser,
  postController.getPostsByCurrentUser
);
postRouter.get("/posts/count", postController.getTotalPostCount);

module.exports = postRouter;
