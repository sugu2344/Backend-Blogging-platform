const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");

const user = {
  checkAuth: (req, res, next) => {
    // const token = req.cookies?.token;
    // or
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = user.id;
      next();
    });
  },
  // allow roles
  allowRoles: (roles) => {
    return async (req, res, next) => {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!roles.includes(user.role)) {
        return res.status(401).json({ message: "Forbidden" });
      }
      next();
    };
  },
};

module.exports = user;
