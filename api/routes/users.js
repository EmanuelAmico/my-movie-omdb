const express = require("express")
const { getUsers } = require("../controllers")
const checkToken = require("../middlewares/jwt")
const router = express.Router()

//------------------------ GET ------------------------//
router.get('/', checkToken, getUsers)





module.exports = router