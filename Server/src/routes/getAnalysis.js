const express = require("express");
const analysisGetter = express.Router();
const Resume = require("../models/resume");
analysisGetter.get("/:resumeId/resume", async (req, res) => {
  try {
    const  resumeId  = req.params.resumeId;
    const userId = req.user.id;
    const existingResume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });
    if (!existingResume) {
      return res.status(404).json({ error: "No Resume found" });
    }
    return res.status(200).json({
      analysis: existingResume.analysis,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong try after sometime" });
  }
});
module.exports = analysisGetter;
