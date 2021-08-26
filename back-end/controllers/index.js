const usersMethods = require("./usersMethods");
const authMethods = require("./authMethods");

module.exports = {
  ...usersMethods,
  ...authMethods,
};
