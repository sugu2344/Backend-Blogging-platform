const Post = require("../models/postModel");
const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content, tags, categories, status } = req.body;
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const newPost = new Post({
        title,
        content,
        tags,
        categories,
        status: status || "draft",
        author: req.user.id,
      });

      await newPost.save();

      return res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      return res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
    }
  },
  // get
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate("author", "name email");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  },
  // get by id
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate(
        "author",
        "name email"
      );
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching post", error });
    }
  },
  //    update
  updatePost: async (req, res) => {
    try {
      const { title, content, tags, categories, status } = req.body;
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (post.author.toString() !== req.user.id)
        return res.status(403).json({ message: "Unauthorized" });

      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      post.status = status || post.status;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error });
    }
  },
  // delete
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const deletePost = await Post.findByIdAndDelete(id);
      if (!deletePost) {
        return res.status(404).json({ message: "post not found" });
      }
      res.json({ message: "post deleted successfully", deletePost });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }
  },
};
module.exports = postController;
