var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//=============SHOW ALL CAMPGROUNDS========//
router.get('/',middleware.isLoggedIn, function(req, res){
    //Get all the campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
        }
    });
});
//=======SHOW THE FORM TO CREATE A NEW CAMPGROUND======
router.get('/new',middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

//===========SHOW THE CAMPGROUND============//
// tıklanan kamp yerinin idsini bulup bu id ye göre databaseden o objeyi sayfaya gönderiyor 
router.get('/:id',middleware.isLoggedIn, function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect('back');
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//===========POST A CAMPGROUND=============//
router.post('/', middleware.isLoggedIn, function(req,res){
    // get data from form
    // add to campgrounds array
    // add to campgrounds page
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price:price, image:image, description:desc, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "You successfully created a campground!");
            res.redirect("campgrounds");
        }
    })
});

//============== EDIT A CAMPGROUNG ============//
//shows the edit form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    // is user logged in?
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//============== UPDATE A CAMPGROUNG ============//
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //res.render("campgrounds/show", {campground: updatedCampground});
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});
//============== DELETE A CAMPGROUNG ============//
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }    
    })
});

module.exports = router;