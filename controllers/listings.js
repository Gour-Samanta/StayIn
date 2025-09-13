const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const customError = require("../utils/customError.js");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: 'openstreetmap'
};
const geocoder = NodeGeocoder(options);

module.exports.index =  async(req,res)=>{
    let List_data = await Listing.find({});
   res.render("listings/index.ejs",{List_data}); 
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/add.ejs");
}

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash("error", "Invalid listing ID.");
            return res.redirect("/listings");
        }

    

    let item = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"createdBy"
        }
    })
    .populate("owner");
    if(!item){
        throw new customError(404 , "Page Not Found!");
    }
    const locationName = item.location.split(",")[0]; //to extract the first location only
    const geoData = await geocoder.geocode(locationName);
    
    if (geoData.length > 0) {
      const lat = geoData[0].latitude;
      const lon = geoData[0].longitude;
     res.render("listings/show.ejs" , {item ,locationName , lat , lon });
    } else {
        res.render("listings/show.ejs" , {item , locationName ,lat: 22.5726, lon: 88.3639 });
    }
    
}

module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.originalname;

    let listing1 =  new Listing(req.body);
    listing1.image = {url , filename};
    listing1.owner = req.user;
   
    await listing1.save();  //this is a async process

    req.flash("success" , "Successfully created..");
    res.redirect("/listings");
}

module.exports.renderUpdateForm = async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);

    res.render("listings/edit.ejs",{data});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let newData = req.body;
    let listing = await Listing.findByIdAndUpdate(id ,{
        title:newData.title,
        description:newData.description,
        image:newData.image,
        price:newData.price,
        location:newData.location,
        country:newData.country
    });    //check for -ve price 

    if(req.file){
         let url = req.file.path;
    let filename = req.file.originalname;
    listing.image = {url , filename};
    listing.save();
    }
   
    req.flash("success" , "Successfully updated..");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success" , "Successfully Deleted..");
    res.redirect("/listings");
}