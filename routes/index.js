var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//=============LANDING PAGE==========//
router.get('/', function(req,res){
   res.render('landing'); 
});

//===========
//AUTH ROUTES
//===========
router.get('/register', function(req, res) {
    res.render('register');
});
//Sign up Logic
router.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    }); 
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function () {
    console.lof("req");
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "logged you out!");
    res.redirect('/');
});


module.exports = router;