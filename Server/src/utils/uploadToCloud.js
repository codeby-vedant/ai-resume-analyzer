const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const uploadToCloud = async (fileBuffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "userResumes" },
          (error, result) => {
            if (error) {
              console.log(error); //debug
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(fileBuffer);
    });
    return result;
  } catch (err) {
    throw new Error("failed to Upload to Cloudinary");
  }
};
const uploadProfilePicToCloud = async (filebuffer, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ err: "No user found" });
    }
    // delete old photo
    if (user.profilePhoto && user.profilePhoto.public_id) {
      await cloudinary.uploader.destroy(user.profilePhoto.public_id);
    }
    //upload a new one
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "ProfilePics",
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        )
        .end(filebuffer);
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong try again");
  }
};
module.exports = { uploadToCloud, uploadProfilePicToCloud };
