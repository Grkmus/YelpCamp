var express = require("express");
var router = express.Router();
var CampgroundService = require("../services/campground-service");
var middleware = require("../middleware");

//=============SHOW ALL CAMPGROUNDS========//
router.get('/',middleware.isLoggedIn, async (req, res) => {
    console.log(req.user)
    const allCampgrounds = await CampgroundService.findAll()
    res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
});

//=======SHOW THE FORM TO CREATE A NEW CAMPGROUND======
router.get('/new',middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

//===========SHOW THE CAMPGROUND============//
router.get('/:id',middleware.isLoggedIn, async (req, res) => {
    const foundCampground = await CampgroundService.find(req, res)
    res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
});

//===========POST A CAMPGROUND=============//
router.post('/', middleware.isLoggedIn, async (req,res) => {
    await CampgroundService.add(req, res)
    req.flash("success", "You successfully created a campground!")
    res.redirect("campgrounds")
});

//============== EDIT A CAMPGROUNG ============//
router.get("/:id/edit", middleware.checkCampgroundOwnership, async (req, res) => {
    const foundCampground = await CampgroundService.find(req, res)
    res.render("campgrounds/edit", {campground: foundCampground});
});

//============== UPDATE A CAMPGROUNG ============//
router.put("/:id", async (req, res) => {
    await CampgroundService.update(req, res)
    res.redirect('/campgrounds/' + req.params.id)
});

//============== DELETE A CAMPGROUNG ============//
router.delete("/:id", middleware.checkCampgroundOwnership, async (req, res) => {
    await CampgroundService.del(req)
    res.redirect('/campgrounds')
});

module.exports = router;