const express = require("express");
const auth = require("../middleware/user");
const userController = require("../controllers/usercontroller");
const user = require("../middleware/user");
const userRouter = express.Router();
userRouter.post("/authenticate", userController.authenticate);
userRouter.post("/register", userController.register);
userRouter.get("/profile", user.verifyLogin, userController.profile);
userRouter.post("/reset", userController.resetPassword);
userRouter.put("/change", userController.changePassword);

module.exports = userRouter;
