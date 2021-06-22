/* const express = require("express") */ // mepa que no hace falta
const { Users } = require("../models")

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll()
    res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
}