if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const  methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy  =require("passport-local");
const User = require("./models/user.js");
const customError = require("./utils/customError.js");


//router
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const listingSearch = require("./routes/search.js");
const bookingRouter = require("./routes/bookings.js");



app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const dbUrl = process.env.ATLAS_URL;
async function main(){
    await mongoose.connect(`${dbUrl}`);    //  'mongodb://127.0.0.1:27017/sea'
    
}
main()
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
    secret:process.env.SECRET
  },
  touchAfter: 24*60*60
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    rolling: true,  
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/",(req,res)=>{
    res.redirect("/listings");
});


//listing
app.use("/listings" , listingRouter);

//reviews
app.use("/listings/:id/review" , reviewRouter);

//signup
app.use("/" , userRouter);

//search
app.use("/search",listingSearch);

//booking
app.use("/bookings" ,bookingRouter );

// app.get( "/bookings/:id", (req, res) => {
//     res.render("bookings/bookings.ejs", { itemId: req.params.id });
// });

//to handle wrong route
app.use( (req,res,next)=>{ 
    next(new customError(404 , "Oops! Page not found."));
});

//global error handler middleware
app.use((err,req,res,next)=>{
    let {statusCode =500 , message ='Something went wrong.'} = err;
    res.status(statusCode).render("listings/error.ejs" ,{message});

});
const PORT = process.env.PORT || 8080;
app.listen(PORT ,()=>{
    console.log(`app is listening at port ${PORT}`);
});