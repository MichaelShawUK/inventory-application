const Club = require("../models/club");

exports.club_list = (req, res, next) => {
  res.send("CLUB LIST");
};

exports.club_create_get = (req, res, next) => {
  res.send("CLUB CREATE GET");
};

exports.club_create_post = (req, res, next) => {
  res.send("CLUB CREATE POST");
};

exports.club_delete_get = (req, res, next) => {
  res.send("CLUB DELETE GET");
};

exports.club_delete_post = (req, res, next) => {
  res.send("CLUB DELETE POST");
};

exports.club_update_get = (req, res, next) => {
  res.send("CLUB UPDATE GET");
};

exports.club_update_post = (req, res, next) => {
  res.send("CLUB UPDATE POST");
};

exports.club_info = (req, res, next) => {
  res.send("CLUB INFO");
};
