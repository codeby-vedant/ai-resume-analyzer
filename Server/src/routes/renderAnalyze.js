const express = require("express");
const resume = require("../models/resume");
const renderAnalyze = express.Router();
renderAnalyze.get("/:resumeId/resume", async (req, res) => {
  try {
    const { resumeId } = req.params;
    const existingResume = await resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });
    if (!existingResume) {
      return res.status(404).json({ error: "No resume found" });
    }
    const Analysis=existingResume.analysis;
    if(!Analysis){
        return res.status(404).json({error:"Analysis not found"});
    }
    return res.status(200).json(Analysis);

  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Internal Server error" });
  }
});
module.exports=renderAnalyze;
