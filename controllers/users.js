const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signUp.ejs");
}

module.exports.userSignUp = async(req,res,next)=>{
    try{
        let {username , email , password} = req.body;

    let newUser =  new User({username , email});
    let registerUser = await User.register(newUser , password);

    req.login(registerUser , (err)=>{
        if(err){ 
            return next(err);
        }
        req.flash("success" , `welcome ${username}`);
        res.redirect("/listings");
    })
    
    } catch(err){
        req.flash("error" , `${err.message}`);
        res.redirect("/signUp");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.userLogin = async(req,res)=>{
                req.flash("success" , "welcome back!");
                
                let redirectURL = res.locals.redirectURL || "/listings"  ; 
                res.redirect(redirectURL);
               
               
            }

module.exports.userLogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
       
        res.redirect('/listings');
    })
}