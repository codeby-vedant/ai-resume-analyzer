// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   family: 4,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP verification failed:", error);
//   } else {
//     console.log("SMTP server is ready");
//   }
// });
// module.exports = transporter;
const { Resend } = require("resend"); 
const resend = new Resend(process.env.RESEND_API_KEY);
module.exports = resend;
