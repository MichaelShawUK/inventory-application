const Player = require("../models/player");
const Club = require("../models/club");

exports.player_list = async (req, res, next) => {
  try {
    const players = await Player.find().populate("club");
    res.render("players", { title: "All Players", players });
  } catch (err) {
    return next(err);
  }
};

exports.player_create_get = async (req, res, next) => {
  try {
    const clubs = await Club.find({}, { name: 1 }).sort({
      name: "asc",
    });

    res.render("player_form", {
      title: "Add Player",
      player: null,
      clubs,
      errors: [],
    });
  } catch (err) {
    return next(err);
  }
};

exports.player_create_post = (req, res, next) => {
  res.send(req.body);
};

exports.player_delete_get = (req, res, next) => {
  res.send("PLAYER DELETE GET");
};

exports.player_delete_post = (req, res, next) => {
  res.send("PLAYER DELETE POST");
};

exports.player_update_get = (req, res, next) => {
  res.send("PLAYER UPDATE GET");
};

exports.player_update_post = (req, res, next) => {
  res.send("PLAYER UPDATE POST");
};

exports.player_info = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate("club");
    res.render("player", { title: "PLAYER", player });
  } catch (err) {
    return next(err);
  }
};
