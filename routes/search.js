const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listingsController = require("../controllers/search.js");

router
.route("/")
.get(wrapAsync(listingsController.searchListing)) //search route


module.exports = router;