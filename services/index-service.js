const passport = require('passport')
var User = require("../models/user")

async function registerUser(req, res) {
    //console.log(params)
    await User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if(err){
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    }); 
}

module.exports = {
    registerUser
}