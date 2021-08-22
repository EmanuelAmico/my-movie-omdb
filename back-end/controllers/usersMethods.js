const { Users, Movies } = require("../models");

//------------------------ GET ------------------------//

const getUsers = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const users = await Users.find({ _id: { $ne: userId } })
      .populate("favoriteMovies")
      .select("-password")
      .exec();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const getSelf = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const user = await Users.findOne({ _id: userId }).select("-password").exec();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const getSelfFavoriteMovies = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const favoriteMovies = await Movies.find({ user: userId }).exec();
    res.status(200).send(favoriteMovies);
  } catch (error) {
    next(error);
  }
};

const getFavoriteMovies = async (req, res, next) => {
  try {
    const { userId } = req.params
    const favoriteMovies = await Movies.find({ user: userId }).exec()
    res.status(200).send(favoriteMovies)
  } catch (error) {
    next(error)
  }
}

//------------------------ POST ------------------------//

const postFavoriteMovie = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    req.body.user = userId
    const movie = req.body;
    const { imdbID } = movie;
    const alreadyExists = await Movies.findOne({ userId, imdbID }).exec();
    if (alreadyExists) {
      res
        .status(302)
        .send("The user has already added that movie to its favorites");
    } else {
      const newFavoriteMovie = await Movies.create(movie);
      await Users.findOneAndUpdate({ _id: userId }, { $push: {movies: newFavoriteMovie } }, {new: true}).exec()
      res.status(201).send(newFavoriteMovie);
    }
  } catch (error) {
    next(error);
  }
};

//------------------------ DELETE ------------------------//
const deleteFavoriteMovie = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { imdbID } = req.params;
    const movie = await Movies.findOne({ imdbID, user: userId }).exec();
    if (movie) {
      const updatedUser = await Users.findOneAndUpdate({ _id: userId }, { $pull: { movies: movie._id } }, { new: true }).exec()
      const destroyedMovie = await movie.delete();
      res.status(200).send(destroyedMovie);
    } else {
      res
        .status(404)
        .send("That movie was not found in this user's favorites.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getSelf,
  getFavoriteMovies,
  getSelfFavoriteMovies,
  postFavoriteMovie,
  deleteFavoriteMovie,
};

//TODO fixear las respuestas para que no incluyan información de más o data sensible como el salt y la password hasheada
