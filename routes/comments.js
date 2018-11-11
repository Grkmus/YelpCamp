const express = require("express")
      router = express.Router({mergeParams: true})
      CampgroundService = require("../services/campground-service")
      CommentService = require('../services/comment-service')
      middleware = require("../middleware")
      Campground = require('../models/campground')

/*
 NEW COMMENT FORM
*/
router.get("/new", middleware.isLoggedIn, async (req, res) => {
    const campground = await CampgroundService.find(req, res)
    res.render("comments/new", {campground: campground});
});

/*
 POST NEW COMMENT 
*/
router.post("/", middleware.isLoggedIn, async (req, res) => {
    const campground = await CampgroundService.find(req, res)
    await CommentService.add(req, res)
    res.redirect('/campgrounds/' + campground._id)
});

/*
 EDIT A COMMENT
*/
router.get("/:comment_id/edit", middleware.checkCommentOwnership, async (req, res) => {
    const campground = await CampgroundService.find(req, res)
    const foundComment = await CommentService.find(req, res)
    res.render("comments/edit", {comment: foundComment, campground: campground});

});

/*
 UPDATE A COMMENT
*/
router.put("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
    await CommentService.update(req, res)
    res.redirect("/campgrounds/" + req.params.id);
});

/*
 DELETE A COMMENT
*/
router.delete("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
    await CommentService.del(req, res)
    req.flash("success", "comment deleted successfully");
    res.redirect("/campgrounds/"+ req.params.id);
});





module.exports = router