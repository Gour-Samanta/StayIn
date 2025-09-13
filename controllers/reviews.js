const Listing = require("../models/listing");
const Review = require("../models/review.js");



module.exports.createReview = async(req,res)=>{
    const {id} = req.params;
    const {rating , comment} = req.body;
    let listing = await Listing.findById(id);

    let newReview = new Review({rating: rating , comment:comment});
    newReview.createdBy = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success" , "New review added..");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async(req,res)=>{
            let {id , reviewId} = req.params;
            await Listing.findByIdAndUpdate(id , {$pull :{reviews: reviewId}})
            await Review.findByIdAndDelete(reviewId);

            req.flash("success" , "Review deleted..");
            res.redirect(`/listings/${id}`);
}