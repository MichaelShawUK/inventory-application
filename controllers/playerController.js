const Player = require("../models/player");

exports.player_list = async (req, res, next) => {
  try {
    const players = await Player.find({ club: "Newcastle United" });
    res.render("player", { title: "All Players", players });
  } catch (err) {
    return next(err);
  }
};

exports.player_create_get = (req, res, next) => {
  res.send("PLAYER CREATE GET");
};

exports.player_create_post = (req, res, next) => {
  res.send("PLAYER CREATE POST");
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

exports.player_info = (req, res, next) => {
  res.send("PLAYER INFO");
};
