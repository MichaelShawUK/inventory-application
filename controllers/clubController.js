const Club = require("../models/club");
const Player = require("../models/player");
const uploadImage = require("../utils/uploadImage");
const deleteImage = require("../utils/deleteImage");
const getImageUrl = require("../utils/getImageUrl");
const { body, validationResult } = require("express-validator");

exports.club_list = async (req, res, next) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });
    res.render("clubs", { title: "All Clubs", clubs });
  } catch (err) {
    return next(err);
  }
};

exports.club_create_get = (req, res, next) => {
  const club = null;
  res.render("club_form", { title: "Add Club", club, errors: [] });
};

exports.club_create_post = [
  body("name", "Enter valid club name").trim().isLength({ min: 1 }),
  body("stadium", "Enter valid stadium name").trim().isLength({ min: 1 }),
  body("founded", "Enter year in YYYY format").trim().isLength(4),
  body("image", "Enter valid URL for club badge").trim().isURL(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("club_form", {
        title: "Add Club",
        club: {
          name: req.body.name,
          stadium: req.body.stadium,
          founded: req.body.founded,
          image: req.body.image,
        },
        errors: errors.array(),
      });
      return;
    }
    const { name, stadium, founded, image } = req.body;
    try {
      const imageUrl = await getImageUrl(image, "clubs");
      await Club.create({ name, stadium, founded, image: imageUrl });
      res.redirect("/club");
    } catch (err) {
      return next(err);
    }
  },
];

exports.club_delete_get = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    res.render("club_delete", { title: "Delete Club", club, players: [] });
  } catch (err) {
    return next(err);
  }
};

exports.club_delete_post = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    const players = await Player.find({ club: req.body.id });
    if (players.length > 0) {
      res.render("club_delete", {
        title: "Delete Club",
        club,
        players,
      });
      return;
    }
    await Club.deleteOne({ _id: req.body.id });
    res.redirect("/club");
  } catch (err) {
    return next(err);
  }
};

exports.club_update_get = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    res.render("club_form", { title: "Update Club", club, errors: [] });
  } catch (err) {
    return next(err);
  }
};

exports.club_update_post = [
  body("name", "Enter valid club name").trim().isLength({ min: 1 }),
  body("stadium", "Enter valid stadium name").trim().isLength({ min: 1 }),
  body("founded", "Enter year in YYYY format").trim().isLength(4),
  body("image", "Enter valid URL for club badge").trim().isURL(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("club_form", {
        title: "Update Club",
        club: {
          name: req.body.name,
          stadium: req.body.stadium,
          founded: req.body.founded,
          image: req.body.image,
        },
        errors: errors.array(),
      });
      return;
    }

    try {
      const old_club = await Club.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          stadium: req.body.stadium,
          founded: req.body.founded,
          image: req.body.image,
        }
      );

      if (old_club.image !== req.body.image) {
        await uploadImage(
          { name: req.body.name, url: req.body.image },
          Club,
          "clubs"
        );
      }
      res.redirect("/club");
    } catch (err) {
      return next(err);
    }
  },
];

exports.club_info = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id);
    const players = await Player.find({ club: club._id });
    res.render("club", { title: club.name, club, players });
  } catch (err) {
    return next(err);
  }
};
