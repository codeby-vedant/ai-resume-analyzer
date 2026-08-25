const Resume = require("../models/resume");
const textExtracter = require("../utils/pdfParse");
const { uploadToCloud } = require("../utils/uploadToCloud");
const uploadAndExtract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "File not found" });
    }
    const fileBuffer = req.file.buffer;
    const cloudinaryResult = await uploadToCloud(fileBuffer); //Upload to Cloudnary
    //  console.log(cloudinaryResult); //debug
    const content = await textExtracter(fileBuffer); // pdf parsing

    const resume = await Resume.create({
      user: req.user.id,
      url: cloudinaryResult.secure_url,
      text: content,
      public_id: cloudinaryResult.public_id,
      originalName: req.file.originalname,
    });

    return res.status(201).json({
      resume: resume,
      msg: "Upload Successful",
      url: cloudinaryResult.secure_url,
      text: content,
    });
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Internal Server error" });
  }
};
module.exports = uploadAndExtract;
