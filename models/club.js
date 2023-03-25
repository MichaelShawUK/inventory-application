const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  stadium: { type: String, required: true, maxLength: 50 },
  founded: { type: String, maxLength: 4 },
  image: { type: String },
});

ClubSchema.virtual("url").get(function () {
  return `/club/${this._id}`;
});

// ClubSchema.virtual("imageUrl").get(function () {
//   return `https://res.cloudinary.com/dzpobfxwj/image/upload/clubs/${this._id}.png`;
// });

module.exports = mongoose.model("Club", ClubSchema);
