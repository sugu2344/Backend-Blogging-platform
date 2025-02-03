const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { SECRET_KEY } = require("../utils/config");
const comment = {
  authMiddleware: async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Access denied" });
      console.log(token);
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  },

  adminMiddleware: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.role !== "admin")
        return res.status(403).json({ message: "Access denied" });

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //
};

module.exports = comment;
