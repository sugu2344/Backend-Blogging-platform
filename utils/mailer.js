const nodemailer = require("nodemailer");
const { SECRET_KEY, PASSWORD } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "suganesh7373@gmail.com", 
    pass: PASSWORD, 
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendEmail;
