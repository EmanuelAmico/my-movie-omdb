require("dotenv").config();
const mongoose = require("mongoose");

//Config for deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const hostname = process.env.DB_HOST;

const uri = `mongodb+srv://${username}:${password}@${hostname}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
