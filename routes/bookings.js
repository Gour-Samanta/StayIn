const express = require("express");
const flatpickr = require("flatpickr");

const bookingsController = require("../controllers/bookings.js");
const { isLoggedIn } = require("../middleware.js");
const router = express.Router();

router
.get( "/:id",isLoggedIn,(bookingsController.renderBookingForm) )
.post("/:id" ,bookingsController.createBooking)

module.exports = router;