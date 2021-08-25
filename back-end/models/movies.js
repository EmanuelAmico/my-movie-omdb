const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  imdbID: {
    type: String,
    allowNull: false,
  },
  Title: {
    type: String,
    allowNull: false,
  },
  Year: {
    type: String,
    allowNull: false,
  },
  Rated: {
    type: String,
    allowNull: false,
  },
  Runtime: {
    type: String,
    allowNull: false,
  },
  Director: {
    type: String,
    allowNull: false,
  },
  Actors: {
    type: String,
    allowNull: false,
  },
  Plot: {
    type: String,
    allowNull: false,
  },
  Poster: {
    type: String,
    allowNull: false,
  },
});

const Movies = mongoose.model("movies", skillSchema);

module.exports = Movies;
