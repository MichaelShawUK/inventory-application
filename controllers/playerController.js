const Player = require("../models/player");
const Club = require("../models/club");
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
      player: null,
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
      res.send(
        `${typeof parseInt(req.body.rating)}: ${parseInt(req.body.rating)}`
      );
    } catch (err) {
      return next(err);
    }
  },
];

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
