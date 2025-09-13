const mongoose = require("mongoose");
let sampleData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/sea');
}
main()
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

let initDB = async()=>{
    await Listing.deleteMany({});
    sampleData.data = sampleData.data.map((dataObj) =>({
        ...dataObj , owner : '68b27125ee502362d4a425d3'
    }))
    await Listing.insertMany(sampleData.data);
    console.log("uploded sample data");
}
initDB();