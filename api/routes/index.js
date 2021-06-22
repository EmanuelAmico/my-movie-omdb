const express = require("express")
const router = express.Router()
const userRoutes = require("./users")
const favoritesRoutes = require("./favorites")

router.use('/users', userRoutes)
router.use('/users/:id/favorites', favoritesRoutes)


module.exports = router