const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] 

  if(!token)
    return res.status(401).send("No hay ningún token en el header, missing token")

  jwt.verify(token, "plataforma5", (error, payload) => {
    if(error) 
      return res.status(401).send("Token inválido")

    req.tokenPayload = payload // payload === {id: userId}
    next()
  })

  //TODO investigar si hay alguna forma de transformar esto a promesas :'), porque está usando callbacks
}

module.exports = checkToken