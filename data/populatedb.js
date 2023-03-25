require("dotenv").config();
const mongoose = require("mongoose");
const Player = require("../models/player");
const Club = require("../models/club");
const clubs = require("../data/clubs");
const players = require("../data/players");
const playerImages = require("../data/playerImages");

const cloudinary = require("cloudinary").v2;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

cloudinary.config({
  secure: true,
});

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    const players = await Player.find();
    for (const player of players) {
      const result = await cloudinary.search
        .expression(player._id.toString())
        .execute();

      console.log(result.resources[0].secure_url);

      await Player.findOneAndUpdate(
        { _id: player._id },
        { image: result.resources[0].secure_url }
      );
      console.log(`${player.name} updated`);
    }
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}

async function addClub(input) {
  const club = new Club(input);
  try {
    await club.save();
    console.log(club);
    console.log(`${club.name} added`);
  } catch (err) {
    console.log(err);
  }
}

async function addPlayer(input) {
  try {
    input.club = await Club.findOne({ name: input.club });
    const player = new Player(input);
    await player.save();
    console.log(`${player.name} added`);
  } catch (err) {
    console.log(err);
  }
}
