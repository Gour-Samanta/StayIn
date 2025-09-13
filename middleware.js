const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema , reviewSchema } = require("./schema.js");  //joi
const customError = require("./utils/customError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "Please! login first.");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectURL = (req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
        
    }

    next();
    
}




module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
    if((res.locals.currUser && !res.locals.currUser._id.equals(listing.owner._id))){
        req.flash("error" , "you don't have permission.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//validate schema for server side  ( middleware )
module.exports.validate = (req,res,next)=>{
    const result = listingSchema.validate(req.body);
    if(result.error){
        throw new customError(400 , result.error);
    } else{
        next();
    }
}

module.exports.reviewValidate =(req,res,next)=>{
    const result = reviewSchema.validate(req.body);
    if(result.error){
        throw new customError(400 , result.error);
    } else {
        next();
    }
}

module.exports.isAuther = async(req,res,next)=>{
    let {id , reviewId} = req.params;
     let review = await Review.findById(reviewId);
    if(!res.locals.currUser._id.equals(review.createdBy._id)){
        req.flash("error" , "you don't have permission.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
