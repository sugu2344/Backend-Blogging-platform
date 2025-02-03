const Subscription = require("../models/subscriptionModel");
const SubscriptionController = {
    subscribe : async (req, res) => {
    try {
        const { bloggerId, category } = req.body;
        const userId = req.user.id;

        const newSubscription = new Subscription({ user: userId, blogger: bloggerId, category });
        await newSubscription.save();

        res.status(201).json({ message: 'Subscribed successfully', subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

unsubscribe:async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        await Subscription.findByIdAndDelete(subscriptionId);

        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
};
module.exports = SubscriptionController;
