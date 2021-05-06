const userExists = require("./userExists");
const spaceExists = require("./spaceExists");
const reservationExists = require("./reservationExists");
const reportExists = require("./reportExists");
const reviewExists = require("./reviewExists");
const isAuthorized = require("./isAuthorized");
const packExists = require("./packExists");
const isAdmin = require("./isAdmin");
const spaceIsEnabled = require("./spaceIsEnabled");

module.exports = {
  userExists,
  spaceExists,
  reservationExists,
  reportExists,
  reviewExists,
  isAuthorized,
  packExists,
  isAdmin,
  spaceIsEnabled,
};
