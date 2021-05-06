//const filterUsers = require("./filterUsers");
const addUser = require("./addUser");
const validateUser = require("./validateUser");
const loginUser = require("./loginUser");
const getUser = require("./getUser");
const deleteUser = require("./deleteUser");
const editUser = require("./editUser");
const contactUser = require("./contactUser");
const resetUserPassword = require("./resetUserPassword");
const recoverUserPassword = require("./recoverUserPassword");
const filterUsers = require("./filterUsers");
const editPassword = require("./editPassword");

module.exports = {
  addUser,
  validateUser,
  loginUser,
  getUser,
  deleteUser,
  editUser,
  contactUser,
  recoverUserPassword,
  resetUserPassword,
  filterUsers,
  editPassword,
};
