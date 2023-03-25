require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

cloudinary.config({
  secure: true,
});

const deleteImage = async (id) => {
  try {
    await cloudinary.uploader.destroy(id);
  } catch (err) {
    throw new Error("Failed to delete image from cloudinary");
  }
};

module.exports = deleteImage;
