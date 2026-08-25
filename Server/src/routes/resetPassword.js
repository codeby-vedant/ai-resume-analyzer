const express = require("express");
const emailer = express.Router();
const crypto = require("crypto");
const User = require("../models/user");
const transporter = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
emailer.post("/resetpassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User does not found for this email" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    existingUser.resetPasswordToken = hashedResetToken;
    existingUser.resetPasswordExpires = Date.now() + 3600000; //1 hr expiry
    await existingUser.save();
    const resetLink = `http://localhost:5173/reset/${resetToken}`;

    const info = transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      Subject: "Password Reset",
      text: `Click here to reset your password: ${resetLink}`,
    });
    return res.status(200).json({ msg: "Mail sent" });
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Internal server error" });
  }
});
emailer.post("/resetPassword/:resetToken", async (req, res) => {
  try {
    const resetToken = req.params.resetToken;
    

    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: "New Password is required" });
    }
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const existingUser = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "No user found" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedNewPassword;
    existingUser.resetPasswordExpires = null;
    existingUser.resetPasswordToken = null;
    await existingUser.save();
    return res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = { emailer };
