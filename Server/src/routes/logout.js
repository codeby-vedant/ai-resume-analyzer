const express = require("express");
const logoutHandler = express.Router();
logoutHandler.post("/logout",async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.json({ msg: "Logged out successfully" });
});
module.exports = logoutHandler;
