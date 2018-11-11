const Campground = require('../models/campground')

async function findAll() {
    return Campground.find().catch((err)=> {
        console.log(err)
        res.redirect('/not-found')
    })
}

async function find(req, res) {
    return Campground.findById(req.params.id).populate("comments").exec().catch(() => {
        res.redirect('/not-found')
    }) 
}

async function add(req) {
    const newCampground = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description:req.body.desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    return Campground.create(newCampground).catch((err) => {
        console.log(err)
    })
}

async function del(req) {
    return Campground.findByIdAndRemove(req.params.id).catch(err => {
        console.log(err)
    })
}

async function update(req, res) {
    return Campground.findByIdAndUpdate(req.params.id, req.body.campground).catch(err => {
        console.log(err)
    })
}

module.exports = {
    findAll,
    find,
    add,
    update,
    del
}