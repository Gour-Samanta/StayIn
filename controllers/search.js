const Listing = require("../models/listing");


module.exports.searchListing =  async(req,res)=>{
    let {query} = req.query;
    let List_data = await Listing.find({
    $or: [
    { location: { $regex: query, $options: "i" } },
    { country: { $regex: query, $options: "i" } }
  ]
    });
   res.render("listings/index.ejs",{List_data}); 
}