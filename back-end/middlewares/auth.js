const jwt = require("jsonwebtoken");

const checkLogIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).send("There's no token in headers, missing token.");

  jwt.verify(token, "plataforma5", (error, payload) => {
    if (error) return res.status(401).send("Invalid token");

    req.tokenPayload = payload; // payload === {userId: userId} (ver loginMethods.js)
    next();
  });

  //TODO investigar si hay alguna forma de transformar el jwt.verify a promesas :'), porque está usando callback
};

module.exports = checkLogIn;
