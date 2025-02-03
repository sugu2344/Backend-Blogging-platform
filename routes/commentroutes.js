const express = require("express");
const commentController = require("../controllers/commentcontroller");
const comment = require("../middleware/comment");
const spam = require("../middleware/spamcomment");
const commentRouter = express.Router();
commentRouter.post(
  "/createComment",
  comment.authMiddleware,
  spam.spamFilter,
  commentController.createComment
);
commentRouter.get(
  "/getCommentsByPost/:postId",
  commentController.getCommentsByPost
);
commentRouter.put(
  "/updateComment/:id",
  comment.authMiddleware,
  commentController.updateComment
);
commentRouter.delete(
  "/deleteComment/:id",
  comment.authMiddleware,
  commentController.deleteComment
);
// commentRouter.patch(
//   "/moder/:id/moderate",
//   comment.authMiddleware,
//   comment.adminMiddleware,
//   commentController.moderateComment
// );
module.exports = commentRouter;
