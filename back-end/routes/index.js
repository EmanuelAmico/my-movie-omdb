const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const authRoutes = require("./auth");

// Acá ya estoy parado en '/api'
router.use("/users", userRoutes);
router.use("/login", authRoutes);
router.use("/register", authRoutes);

module.exports = router;
