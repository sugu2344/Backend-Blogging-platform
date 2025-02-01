const express = require("express");
const auth = require("../middleware/user");
const userController = require("../controllers/usercontroller");
const user = require("../middleware/user");
const userRouter = express.Router();
userRouter.post("/authenticate", userController.authenticate);
userRouter.post("/register", userController.register);
userRouter.get(
  "/profile",
  user.checkAuth,
  user.allowRoles(["admin", "user"]),
  userController.profile
);
userRouter.post("/reset", userController.resetPassword);
userRouter.put("/change", userController.changePassword);
userRouter.post("/logout", userController.logout);

module.exports = userRouter;
