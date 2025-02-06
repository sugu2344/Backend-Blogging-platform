const Comment = require("../models/commentModel");

const commentController = {
  // createComment
  createComment: async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("User:", req.user);

      const { postId, content } = req.body;
      if (!postId || !content) {
        return res
          .status(400)
          .json({ message: "Post ID and content are required" });
      }

      const newComment = new Comment({
        postId,
        userId: req.user.id,
        content,
      });

      await newComment.save();
      console.log("Comment Created:", newComment);

      res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (error) {
      console.error("Error Creating Comment:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // getCommentsByPost
  getCommentsByPost: async (req, res) => {
    try {
      const comments = await Comment.find({
        postId: req.params.postId,
      }).populate("userId", "username");
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // updateComment
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await Comment.findById(req.params.id);

      if (!comment)
        return res.status(404).json({ message: "Comment not found" });

      if (comment.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      comment.content = content;
      await comment.save();
      res.json({ message: "Comment updated", comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // deleteComment
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment)
        return res.status(404).json({ message: "Comment not found" });

      if (comment.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await comment.deleteOne();
      res.json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
  // moderateComment
  // moderateComment: async (req, res) => {
  //   try {
  //     const comment = await Comment.findById(req.params.id);
  //     if (!comment)
  //       return res.status(404).json({ message: "Comment not found" });

  //     comment.isApproved = req.body.isApproved;
  //     await comment.save();
  //     res.json({ message: "Comment moderation updated", comment });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

module.exports = commentController;
