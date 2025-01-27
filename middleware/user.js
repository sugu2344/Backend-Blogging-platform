const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const user = {
  verifyLogin: async (request, response, next) => {
    const token = request.headers.authorization?.substring(7);

    if (!token) {
      return response.status(401).json({ message: "Access denied" });
    }

    try {
      const verified = jwt.verify(token, SECRET_KEY);
      request.userId = verified.id;
      //   console.log(verified);
    } catch (error) {
      console.log("error from middleware");
      return response.status(400).json({ message: error.message });
    }

    next();
  },
};
module.exports = user;
