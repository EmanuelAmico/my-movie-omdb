const jwt = require("jsonwebtoken")
const { Users, Movies } = require("../models")


//------------------------ GET ------------------------//

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll()
    res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

const getSelfFavoriteMovies = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload
    const favoriteMovies = await Movies.findAll({where: {userId}})
    res.status(200).send(favoriteMovies)
  } catch (error) {
    next(error)
  }
}

const getFavoriteMovies = async (req, res, next) => {
  try {
    const { userId } = req.params
    const favoriteMovies = await Movies.findAll({where: {userId}})
    res.status(200).send(favoriteMovies)
  } catch (error) {
    next(error)
  }
}

//------------------------ POST ------------------------//

const postFavoriteMovie = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload
    req.body.userId = userId
    const movie = req.body
    const { imdbID } = movie
    const alreadyExists = await Movies.findOne({where: {userId, imdbID}})
    if(alreadyExists){
      res.status(302).send("The user has already added that movie to its favorites")
    } else {
      const newFavoriteMovie = await Movies.create(movie)
      res.status(201).send(newFavoriteMovie)
    }
  } catch (error) {
    next(error)
  }
}

//------------------------ DELETE ------------------------//
const deleteFavoriteMovie = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload
    const { imdbID } = req.params
    const movie = await Movies.findOne({where: {userId, imdbID}})
    if(movie) {
      const destroyedMovie = await movie.destroy({truncate: true})
      res.status(200).send(destroyedMovie) //hacer ternario
    } else {
      res.status(404).send("That movie was not found in this user's favorites.")
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  getFavoriteMovies,
  getSelfFavoriteMovies,
  postFavoriteMovie,
  deleteFavoriteMovie,
}