const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  position: {
    type: String,
    required: true,
    enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  },
  club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
  country: { type: String, required: true, maxLength: 50 },
  rating: { type: Number, min: 1, max: 100, required: true },
  image: { type: String },
});

PlayerSchema.virtual("url").get(function () {
  return `/player/${this._id}`;
});

module.exports = mongoose.model("Player", PlayerSchema);
