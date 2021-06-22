const S = require("sequelize");
const db = require("../db");

class Users extends S.Model {}

Users.init({
  name: {
    type: S.STRING,
    allowNull: false,
  },
  email: {
    type: S.STRING,
    allowNull: false,
  },
  password: {
    type: S.STRING,
    allowNull: false,
  },
}, {sequelize: db, modelName: "users", timestamps: false})

module.exports = Users