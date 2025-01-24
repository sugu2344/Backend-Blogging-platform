const express = require("express");
const userController = require("../controllers/usercontroller");
const userRouter = express.Router();
userRouter.post("/", userController.createBlog);
module.exports = userRouter;
