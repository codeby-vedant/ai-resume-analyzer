const resume = require("../models/resume");
const User=require("../models/user");
const express = require("express");
const renderDashboard = express.Router();
renderDashboard.get("/resumes", async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    
    if (!userId) {
      return res.status(401).json({ error: "No user found" });
    }
    const resumes = await resume.find({
      user: userId,
    });
    const user=await User.findById(userId);
    if (resumes.length==0) {
      return res.status(200).json({
        user:user.name,
        resumes});
    }
    return res.status(200).json({
        user:user.name,
        resumes
    });
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Something went wrong" });
  }
});
module.exports=renderDashboard;
