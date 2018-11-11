const CampgroundService = require("../services/campground-service");
const Comment = require('../models/comment')

async function add(req,res) {
    const campground = await CampgroundService.find(req, res).catch((err) => {
        console.log('selaaams')
        res.redirect('/campgrounds')
    })
    return Comment.create(req.body.comment, async (err, comment) =>{
        if (err) {
            console.log(err);
        } else {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            await comment.save();
            campground.comments.push(comment);
            await campground.save();
        }     
   });
}

async function del(req,res) {
    return Comment.findByIdAndRemove(req.params.comment_id).catch(err => {
        console.log(err)
        res.redirect('back')
    })
}

async function update(req,res) {
    return Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).catch(err => {
        console.log(err)
        res.flash('couldnt do it..')
        res.redirect('/campgrounds')
    })
}

async function find(req,res) {
    return Comment.findById(req.params.comment_id).catch(err => {
        console.log(err)
    })
}

module.exports = {
    add,
    del,
    find,
    update
}