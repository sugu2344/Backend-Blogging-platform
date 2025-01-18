const express = require("express");
const BlogController = require("../controllers/blogcontroller");
const BlogRouter = express.Router();
BlogRouter.post("/", BlogController.createBlog);
module.exports = BlogRouter;
