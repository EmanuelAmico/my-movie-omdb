const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
  /* console.log(req.headers) */
  /* const token = req.headers.authorization */
  /* console.log(token)  */ // -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0MzkzODg3fQ.2zC7xv95_t-EYH7MRqpNFHQ9adQxn7qZcONvns92jHM"
  const token = req.headers.authorization?.split(" ")[1] //si el usuario no manda token no se puede hacer un split de un undefined.. entonces me atajo el TypeError, cada vez que encuentre un ".?" es un puede pasar que lo de antes quede como undefined, traduccion "puede pasar que req.headers.authorization quede undefined si el usuario no mandó token alguno en los headers"
  // si el usuario ni siquiera mandó un toquen en los headers deniego acceso
  if(!token)
    return res.status(401).send("No hay ningún token en el header, missing token")

  /* console.log(token) */
  /* jwt.verify(token, "plataforma5", (error, payload) => {
    console.log("error ->", error)
    console.log("payload ->", payload)
    //Si el token es inválido el error se llena con algo, sería más como un "valid" en vez de "error" el parámetro :' )
  }) */
  //Lo podemos hacer de esta forma tambien, por defecto si está todo ok nos devuelve el payload

  jwt.verify(token, "plataforma5", (error, payload) => {
    if(error) 
      return res.status(401).send("Token inválido")

    //acá abajo podemos nombrar de cualquier forma adentro del req a una propiedad que refleje el payload, si quisiera le podria poner req.datosDelUsuario = payload, pero yo lo hice más genérico al nombre
    req.tokenPayload = payload // payload === {id: userId}
    next()
  })

  //TODO investigar si hay alguna forma de transformar esto a promesas :'), porque está usando callbacks
}

module.exports = checkToken