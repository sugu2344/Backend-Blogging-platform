const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { SECRET_KEY } = require("../utils/config");

const post = {
  authenticateUser: async (req, res, next) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  },
};

module.exports = post;
