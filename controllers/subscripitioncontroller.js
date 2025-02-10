const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/mailer");

const SubscriptionController = {
  subscribe: async (req, res) => {
    try {
      const { bloggerId, category } = req.body;
      const userId = req.user.id;

      // Check if user is already subscribed
      const existingSubscription = await Subscription.findOne({
        user: userId,
        blogger: bloggerId,
        category,
      });
      if (existingSubscription) {
        return res.status(400).json({ message: "Already subscribed" });
      }

      const newSubscription = new Subscription({
        user: userId,
        blogger: bloggerId,
        category,
      });
      await newSubscription.save();

      // Fetch user email
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send email notification
      const emailSubject = "Subscription Confirmation";
      const emailText = `You have successfully subscribed to updates from ${
        category || "your selected blogger"
      }.`;
      const emailHtml = `<p>Hi ${user.name},</p>
                         <p>You have successfully subscribed to ${
                           category
                             ? `category: ${category}`
                             : `blogger: ${bloggerId}`
                         }.</p>
                         <p>You will receive notifications .</p>`;

      await sendEmail(user.email, emailSubject, emailText, emailHtml);

      res.status(201).json({
        message: "Subscribed successfully",
        subscription: newSubscription,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  unsubscribe: async (req, res) => {
    try {
      const { subscriptionId } = req.params;
      await Subscription.findByIdAndDelete(subscriptionId);

      res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = SubscriptionController;
