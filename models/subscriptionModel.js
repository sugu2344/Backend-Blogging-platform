const mongoose = require("mongoose");
const subscriptionModelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  blogger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model(
  "Subscription",
  subscriptionModelSchema,
  "Subscriptions"
);
