const Club = require("../models/club");
const Player = require("../models/player");
const uploadImage = require("../utils/uploadImage");

exports.club_list = async (req, res, next) => {
  try {
    const clubs = await Club.find();
    res.render("clubs", { title: "All Clubs", clubs });
  } catch (err) {
    return next(err);
  }
};

exports.club_create_get = (req, res, next) => {
  const club = null;
  res.render("club_form", { title: "Add Club", club });
};

exports.club_create_post = async (req, res, next) => {
  const { name, stadium, founded } = req.body;
  try {
    await Club.create({ name, stadium, founded });
    await uploadImage({ name, url: req.body.image }, Club, "clubs");
    res.redirect("/club");
  } catch (err) {
    return next(err);
  }
};

exports.club_delete_get = (req, res, next) => {
  res.send("CLUB DELETE GET");
};

exports.club_delete_post = (req, res, next) => {
  res.send("CLUB DELETE POST");
};

exports.club_update_get = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    res.render("club_form", { title: "Update Club", club });
  } catch (err) {
    return next(err);
  }
};

exports.club_update_post = (req, res, next) => {
  res.send("CLUB UPDATE POST");
};

exports.club_info = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    const players = await Player.find({ club: club._id });
    res.render("club", { title: "Club", club, players });
  } catch (err) {
    return next(err);
  }
};
