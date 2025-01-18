const BlogController = {
  createBlog: (request, response) => {
    response.json({ message: "Blog created sucessfully" });
  },
};
module.exports = BlogController;
