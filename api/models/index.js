const Users = require("./users")
const Movies = require("./movies")

Users.hasMany(Movies, {as: "favoriteMovie"})

module.exports = {Users, Movies}