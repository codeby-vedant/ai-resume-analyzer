const cloudinary = require("../config/cloudinary");
const uploadToCloud = async (fileBuffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "userResumes" },
          (error, result) => {
            if (error) {
              console.log(error);//debug
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
module.exports = uploadToCloud;
