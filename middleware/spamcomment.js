const badWords = ["spam", "fake", "scam"];

const spamWords = {
  spamFilter: (req, res, next) => {
    const { content } = req.body;
    if (badWords.some((word) => content.toLowerCase().includes(word))) {
      return res.status(400).json({ message: "Spam detected" });
    }
    next();
  },
};
module.exports = spamWords;
