var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//============COMMENT ROUTES ============//
router.get("/new",middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }     
           });
       } 
    });
});
//==============================
// EDIT A COMMENT
//==============================
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    //res.send("This is the comment edit route!");
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", {comment: foundComment, campground: campground});
                }
            });
        }
    });

});
//==============================
// UPDATE A COMMENT
//==============================
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});
//==============================
// DELETE A COMMENT
//==============================
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, deletedComment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted successfully");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});





module.exports = router;