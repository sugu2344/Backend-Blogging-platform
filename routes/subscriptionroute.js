const express = require("express");
const subscriptionRouter = express.Router();
const comment = require("../middleware/comment");
const SubscriptionController = require("../controllers/subscripitioncontroller");
subscriptionRouter.post(
  "/subscribe",
  comment.authMiddleware,
  SubscriptionController.subscribe
);
subscriptionRouter.delete(
  "/unsubscribe/:subscriptionId",
  comment.authMiddleware,
  SubscriptionController.unsubscribe
);
module.exports = subscriptionRouter;
