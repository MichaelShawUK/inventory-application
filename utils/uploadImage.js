require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_CONNECT;
const Player = require("../models/player");
const Club = require("../models/club");
const cloudinary = require("cloudinary").v2;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

const playerImages = require("../data/playerImages");
const clubImages = require("../data/clubImages");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

cloudinary.config({
  secure: true,
});

async function getInfo(name, collection) {
  //Retrieves document matching NAME field from COLLECTION
  try {
    const info = await collection.findOne({ name });
    return info;
  } catch (err) {
    console.error(err);
  }
}

async function getImageUrl(image, folder) {
  try {
    const options = {
      overwrite: true,
      folder,
    };

    const result = await cloudinary.uploader.upload(image, options);
    console.log(result.secure_url);
  } catch (err) {}
}

async function uploadImage(document, collection, folder) {
  // Function uploads image to cloudinary with image id matching mongoDB id
  // DOCUMENT is object with name and url of remote image as properties
  // FOLDER states where to save image in cloudinary file structure
  try {
    const info = await getInfo(document.name, collection);
    if (!info) {
      throw new Error("Could not find document");
    }
    const id = info._id.toString();
    const name = info.name.split(" ").join("");

    const options = {
      public_id: id,
      display_name: name,
      unique_filename: false,
      overwrite: true,
      folder,
    };

    const result = await cloudinary.uploader.upload(document.url, options);
    await updateDocumentImage(id, collection, result.secure_url);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

async function updateDocumentImage(id, collection, url) {
  try {
    await collection.findOneAndUpdate({ _id: id }, { imageUrl: url });
  } catch (err) {
    console.error(err);
  }
}

// (async () => {
//   for (const club of clubImages) {
//     await uploadImage(club, Club, "clubs");
//   }
//   mongoose.connection.close();
// })();

module.exports = uploadImage;
