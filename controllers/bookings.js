
const flatpickr = require("flatpickr");
const Listing = require("../models/listing.js");
module.exports.renderBookingForm = async(req, res) => {
    let item = await Listing.findById(req.params.id);
    res.render("bookings/bookings.ejs", { itemId: req.params.id, flatpickr ,item});
}

module.exports.createBooking = async(req, res) => {
    console.log(req.body);
    res.send("Booking created successfully!");
}
