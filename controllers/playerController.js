const Player = require("../models/player");
const Club = require("../models/club");
const getImageUrl = require("../utils/getImageUrl");
const { body, validationResult } = require("express-validator");

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
      player: {},
      clubs,
      errors: [],
    });
  } catch (err) {
    return next(err);
  }
};

exports.player_create_post = [
  body("name", "Enter valid player name").trim().isLength({ min: 1 }),
  body("position", "Select position").isIn([
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
  ]),
  body("club", "Select club").not().equals("null"),
  body("country", "Enter valid country").trim().isLength({ min: 1 }),
  body("rating", "Enter rating value 0-100").isInt({ min: 0, max: 100 }),
  body("image", "Enter valid URL for player image").trim().isURL(),

  async (req, res, next) => {
    try {
      const clubs = await Club.find({}).sort({ name: 1 });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("player_form", {
          title: "Add Player",
          player: {
            name: req.body.name,
            position: req.body.position,
            club: req.body.club,
            country: req.body.country,
            rating: req.body.rating,
            image: req.body.image,
          },
          clubs,
          errors: errors.array(),
        });
        return;
      }

      const { name, position, club, country, rating, image } = req.body;
      const imageUrl = await getImageUrl(image, "players");
      const clubDoc = await Club.findById(club);
      const player = new Player({
        name,
        position,
        club: clubDoc,
        country,
        rating: parseInt(rating),
        image: imageUrl,
      });

      const playerDoc = await player.save();
      res.redirect(`/player/${playerDoc._id.toString()}`);
    } catch (err) {
      return next(err);
    }
  },
];

exports.player_delete_get = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate("club");
    res.render("player_delete", { title: "Delete Player", player });
  } catch (err) {
    return next(err);
  }
};

exports.player_delete_post = async (req, res, next) => {
  try {
    await Player.deleteOne({ _id: req.params.id });
    res.redirect("/player");
  } catch (err) {
    return next(err);
  }
};

exports.player_update_get = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);
    const clubs = await Club.find().sort({ name: 1 });
    player.club = player.club;
    res.render("player_form", {
      title: "Update Player",
      player,
      errors: [],
      clubs,
    });
  } catch (err) {
    return next(err);
  }
};

exports.player_update_post = [
  body("name", "Enter valid player name").trim().isLength({ min: 1 }),
  body("position", "Select position").isIn([
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
  ]),
  body("club", "Select club").not().equals("null"),
  body("country", "Enter valid country").trim().isLength({ min: 1 }),
  body("rating", "Enter rating value 0-100").isInt({ min: 0, max: 100 }),
  body("image", "Enter valid URL for player image").trim().isURL(),

  async (req, res, next) => {
    try {
      const updatedPlayer = {
        name: req.body.name,
        position: req.body.position,
        club: req.body.club,
        country: req.body.country,
        rating: req.body.rating,
        image: req.body.image,
      };
      const clubs = await Club.find({}).sort({ name: 1 });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("player_form", {
          title: "Update Player",
          player: updatedPlayer,
          clubs,
          errors: errors.array(),
        });
        return;
      }

      const old_player = await Player.findById(req.params.id);

      let imageUrl = old_player.image;

      if (old_player.image !== req.body.image) {
        imageUrl = await getImageUrl(req.body.image, "players");
      }

      updatedPlayer.image = imageUrl;

      await Player.updateOne({ _id: req.params.id }, updatedPlayer);
      res.redirect(`/player/${req.params.id}`);
    } catch (err) {
      return next(err);
    }
  },
];

exports.player_info = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate("club");
    res.render("player", { title: player.name, player });
  } catch (err) {
    return next(err);
  }
};
