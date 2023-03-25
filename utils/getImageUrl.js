require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

async function getImageUrl(image, folder) {
  try {
    const options = {
      overwrite: true,
      folder,
    };

    const result = await cloudinary.uploader.upload(image, options);
    return result.secure_url;
  } catch (err) {
    console.error("Failed to upload image to cloudinary");
  }
}

module.exports = getImageUrl;
