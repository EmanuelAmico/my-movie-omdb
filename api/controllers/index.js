const { Users } = require("../models")

//------------------------ GET ------------------------//

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll()
    res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

//------------------------ POST ------------------------//

const postUser = async (req, res, next) => {
  try {
    const createdUser = await Users.create(req.body)
    res.status(201).send(createdUser)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  postUser
}