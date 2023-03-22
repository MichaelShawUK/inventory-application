require("dotenv").config();
const mongoose = require("mongoose");
const Player = require("../models/player");
const Club = require("../models/club");
const clubs = require("../data/clubs");
const players = require("../data/players");

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    // for (let club of clubs) {
    //   await addClub(club);
    // }

    // for (let player of players) {
    //   await addPlayer(player);
    // }
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
