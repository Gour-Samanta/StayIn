const mongoose = require("mongoose");
const Review = require("./review.js");

// our database name is sea 

const listingSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
           filename: {
            type:String
            },
            url:{
                type:String,
                default:"https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
                set:(v)=>v || "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }

      },
    price:{
        type:Number,
        min:0,
        required:true
        
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
        
    },
    reviews :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
listingSchema.post("findOneAndDelete" , async(result)=>{
    if(result){
        await Review.deleteMany({_id : {$in : result.reviews}});
    }
});

const Listing = new mongoose.model("Listing",listingSchema);

module.exports = Listing;