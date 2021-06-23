const jwt = require("jsonwebtoken")
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

const postRegisterUser = async (req, res, next) => {
  try {
    const createdUser = await Users.create(req.body)
    res.status(201).send(createdUser)
  } catch (error) {
    next(error)
  }
}

const postLoginUser = async (req, res, next) => {
  try {
    //chequear si el usuario es valido, en caso de que el usuario es correcto -> genero el token
    const { email, password } = req.body
    //evaluamos el email
    const user = await Users.findOne({where: {email}})
    if(!user) 
      return res.status(400).send("el usuario no existe")
      
    if(!user.validPassword(password))
      return res.status(401).send("invalid credentials, forbidden")
      
    //si pasó todas estas validaciones, generamos el token, con el primer parametro seleccionamos que info queremos hashear (el payload) y en el segundo la secret key que despues nos va a servir para deshashear el payload
    const token = jwt.sign({id: user.id}, "plataforma5")

    return res.status(200).send({ token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  postRegisterUser,
  postLoginUser
}