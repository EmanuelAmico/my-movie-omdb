require('dotenv').config()
const mongoose = require("mongoose")

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const hostname = process.env.DB_HOST

const uri =
  `mongodb+srv://${username}:${password}@${hostname}`;
  
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose
