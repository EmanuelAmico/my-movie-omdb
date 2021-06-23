const express = require("express")
const { getUsers, postUser } = require("../controllers")
const router = express.Router()

//------------------------ GET ------------------------//
router.get('/', getUsers)


//------------------------ POST ------------------------//
router.post('/', postUser)



module.exports = router