const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_ACCOUNT,//pakai akun kalian sebelum itu buat akun gmail menjadi 2 langkah
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

module.exports = { transporter }