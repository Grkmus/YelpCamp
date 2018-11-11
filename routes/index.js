var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
const indexService = require('../services/index-service')

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
router.post('/register', async function(req, res) {
    return await indexService.registerUser(req, res).catch(err => {
        console.log(err)
    })
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/not-found', function(req, res) {
    res.render('not-found');
});

router.post('/login', passport.authenticate('local',{
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),() => {
        console.log("req");
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "logged you out!");
    res.redirect('/');
});


module.exports = router;