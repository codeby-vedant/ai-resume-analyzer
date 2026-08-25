const express = require("express");
const User = require("../models/user");
const { uploadProfilePic } = require("../utils/upload");
const { uploadProfilePicToCloud } = require("../utils/uploadToCloud");
const updater = express.Router();
updater.post("/update", async (req, res) => {
  try {
    const { name, location, phoneNo, Role } = req.body;

    const userId = req.user.id;
    const existingUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        location,
        phoneNo,
        Role,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(201).json(existingUser);
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ getErrorMap: "Internal Server error" });
  }
});
updater.patch(
  "/photo/update",
  uploadProfilePic.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(404).json({ error: "No file found" });
      }

      const filebuffer = req.file.buffer;
      const result = await uploadProfilePicToCloud(filebuffer, req.user.id);
      // save url to user document in db
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          profilePhoto: {
            url: result.secure_url,
            public_id: result.public_id,
          },
        },
        { new: true },
      );
      return res.status(200).json({
        msg: "Profile photo updated",
        profilePhoto: updatedUser.profilePhoto,
      });
    } catch (err) {
      console.log(err); //debug
      return res.status(500).json({ error: "Something went wrong try again" });
    }
  },
);
module.exports = updater;
