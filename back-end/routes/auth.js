const express = require("express");
const { postLoginUser, postRegisterUser } = require("../controllers");
const router = express.Router();

//------------------------ POST ------------------------//
router.post("/", postLoginUser);
router.post("/", postRegisterUser);

module.exports = router;
