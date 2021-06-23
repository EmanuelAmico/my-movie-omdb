const jwt = require("jsonwebtoken")
const { Users } = require("../models")


//------------------------ POST ------------------------//

const postRegisterUser = async (req, res, next) => {
  try {
    const user = req.body
    const { email } = user
    const alreadyExists = await Users.findOne({where: { email } })
    if(alreadyExists) {
      res.status(302).send("The user already exists")
    } else {
      const createdUser = await Users.create(req.body)
      res.status(201).send(createdUser)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postRegisterUser,
}