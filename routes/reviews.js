const express = require("express");
const router = express.Router({mergeParams :true});
const {reviewValidate, isLoggedIn, isAuther} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");


const reviewsController = require("../controllers/reviews.js");

//post review
router.post("/" ,isLoggedIn, reviewValidate, wrapAsync(reviewsController.createReview));

//delete reviews
router.delete("/:reviewId" , 
            isLoggedIn ,
            isAuther,
            wrapAsync(reviewsController.destroyReview));

module.exports = router;