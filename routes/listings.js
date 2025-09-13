const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validate } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");

const listingsController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingsController.index)) //index route
  .post(
    validate,
    isLoggedIn,
    upload.single("image[url]"),
    wrapAsync(listingsController.createListing)
    
  ); //create route

//new route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing)) //show route
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing)) //destroy route
  .put(
    isLoggedIn,
    isOwner,
     upload.single("image[url]"),
    validate,
    wrapAsync(listingsController.updateListing)
  );

//update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderUpdateForm)
);

module.exports = router;
