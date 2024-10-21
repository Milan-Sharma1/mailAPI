require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.LOGIN,
    pass: process.env.PASSWORD,
  },
});

const mailer = async (req, res) => {
  try {
    const { From, To, Subject, Text } = req.body;
    const info = await transporter.sendMail({
      from: From, // sender address
      to: To, // list of receivers
      subject: Subject, // Subject line
      text: Text, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    if (!info) {
      res.status(500).json("Some Error At Mail Service");
    }
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json("Mail Sent");
  } catch (error) {
    console.log("error ", error);
  }
};
module.exports = { mailer };
