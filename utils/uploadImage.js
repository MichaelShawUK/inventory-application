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

// async function getPlayerInfo(name) {
//   try {
//     const playerInfo = await Player.findOne({ name });
//     return playerInfo;
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function getClubInfo(name) {
//   try {
//     const playerInfo = await Player.findOne({ name });
//     return playerInfo;
//   } catch (err) {
//     console.error(err);
//   }
// }

async function getInfo(name, model) {
  try {
    const info = await model.findOne({ name });
    return info;
  } catch (err) {
    console.error(err);
  }
}

async function uploadImage(docName, model, imagePath, folder) {
  try {
    const info = await getInfo(docName, model);
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

    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  for (const club of clubImages) {
    await uploadImage(club.name, Club, club.url, "clubs");
  }
  mongoose.connection.close();
})();

// async function uploadPlayerImage(player, imagePath) {
//   try {
//     const playerInfo = await getPlayerInfo(player);
//     if (!playerInfo) {
//       throw new Error("Player not found");
//     }
//     const id = playerInfo._id.toString();
//     const name = playerInfo.name.split(" ").join("");

//     const options = {
//       public_id: id,
//       display_name: name,
//       unique_filename: false,
//       overwrite: true,
//       folder: "players",
//     };

//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function uploadClubImage(club, imagePath) {
//   try {
//     const playerInfo = await getPlayerInfo(player);
//     if (!playerInfo) {
//       throw new Error("Player not found");
//     }
//     const id = playerInfo._id.toString();
//     const name = playerInfo.name.split(" ").join("");

//     const options = {
//       public_id: id,
//       display_name: name,
//       unique_filename: false,
//       overwrite: true,
//       folder: "players",
//     };

//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   }
// }

// (async () => {
//   for (const player of playerImages) {
//     await uploadPlayerImage(player.name, player.url);
//   }
//   mongoose.connection.close();
// })();

// (async () => {
//   try {
//     const result = await Club.find({}, { name: 1, _id: 0 });
//     console.log(result);
//     mongoose.connection.close();
//   } catch (err) {
//     console.error(err);
//   }
// })();
