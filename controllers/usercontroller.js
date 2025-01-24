const userController = {
  createBlog: (request, response) => {
    response.json({ message: "Blog created sucessfully" });
  },
};
module.exports = userController;
