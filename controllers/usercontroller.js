const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const nodemailer = require("nodemailer"); // Add missing nodemailer import
const userController = {
  // Register
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ message: "User already exists" });
      }
      const PasswordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: PasswordHash,
      });
      await newUser.save();
      response.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Authenticate (Login)
  authenticate: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

      response.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          bio:user.bio,
          role: user.role,
        },
        message: "User logged in successfully",
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Fetch Profile
  profile: async (request, response) => {
    try {
      const userId = request.userId;
      const user = await User.findById(userId);
      response.status(201).json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Logout
  logout: async (request, response) => {
    try {
      response.clearCookie("token");
      response.status(200).json({ message: "Logout successful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Reset Password
  resetPassword: async (request, response) => {
    try {
      const { email } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      const token = Math.random().toString(36).slice(-8);
      user.resetPassword = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "suganesh7373@gmail.com",
          pass: "PASSWORD", // You should ideally store this in a safer place like environment variables
        },
      });
      const message = {
        from: "suganesh7373@gmail.com",
        to: user.email,
        subject: "Password Reset",
        text: `Reset the password for your account.\n\nPlease use the following token to reset your password: ${token}`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          return response.status(404).json({ message: "Something went wrong" });
        }
        response.status(201).json({ message: "Password reset email sent" });
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // Change Password
  changePassword: async (request, response) => {
    try {
      const { code, password } = request.body;
      const user = await User.findOne({
        resetPassword: code,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return response
          .status(404)
          .json({ message: "Invalid or expired reset code" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      user.resetPassword = null;
      user.resetPasswordExpires = null;
      await user.save();
      response
        .status(201)
        .json({ message: "Password has been successfully reset" });
    } catch (error) {
      console.error("Error during password reset:", error.message);
      response.status(500).json({ message: "Internal server error" });
    }
  },
  // get all users

  getAllUsers: async (request, response) => {
    try {
      const users = await User.find({}, "-password");
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // update profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.userId;
      const { name, bio } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { name, bio, updatedAt: Date.now() },
        { new: true, select: "-password" }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
