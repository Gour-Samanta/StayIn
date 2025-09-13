const express = require("express");
const router =express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash");
const {  saveRedirectURL } = require("../middleware.js");

const usersController = require("../controllers/users.js");


router
.route("/signUp")
.get(usersController.renderSignupForm)
.post( wrapAsync(usersController.userSignUp));


router
.route("/login")
.get( usersController.renderLoginForm)
.post( saveRedirectURL ,
                passport.authenticate('local' , { failureRedirect: '/login' ,failureFlash: true}) ,
                usersController.userLogin
                );


router.get("/logout" , usersController.userLogout);

module.exports = router;