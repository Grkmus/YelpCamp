var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Kaş",
            image: "http://blog.govego.com/wp-content/uploads/2014/10/kaskamping4-e1413067950206.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor sapien iaculis tellus euismod eleifend. Etiam tincidunt congue magna eu suscipit. Fusce sapien libero, convallis ac elementum ac, feugiat nec eros. Cras ac euismod lorem. Nam quis mollis enim. Proin in risus lacus. Nulla nibh sapien, facilisis eget congue vel, gravida vel nisi. Donec faucibus suscipit nulla eu interdum. In quis dignissim lorem, ut ullamcorper metus. Praesent tincidunt at tortor ut consequat. Duis pretium cursus ante id placerat. Suspendisse tristique iaculis pulvinar. Vestibulum eget elit efficitur, tincidunt neque in, auctor mi."
        },
        {
            name: "Karaburun",
            image: "https://goo.gl/yAT69J",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor sapien iaculis tellus euismod eleifend. Etiam tincidunt congue magna eu suscipit. Fusce sapien libero, convallis ac elementum ac, feugiat nec eros. Cras ac euismod lorem. Nam quis mollis enim. Proin in risus lacus. Nulla nibh sapien, facilisis eget congue vel, gravida vel nisi. Donec faucibus suscipit nulla eu interdum. In quis dignissim lorem, ut ullamcorper metus. Praesent tincidunt at tortor ut consequat. Duis pretium cursus ante id placerat. Suspendisse tristique iaculis pulvinar. Vestibulum eget elit efficitur, tincidunt neque in, auctor mi."
        },
        {
            name:'Erikli',
            image: "http://kazdagiekoturizm.com/en/wp-content/uploads/2013/12/kazdaglari-yayla_002.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor sapien iaculis tellus euismod eleifend. Etiam tincidunt congue magna eu suscipit. Fusce sapien libero, convallis ac elementum ac, feugiat nec eros. Cras ac euismod lorem. Nam quis mollis enim. Proin in risus lacus. Nulla nibh sapien, facilisis eget congue vel, gravida vel nisi. Donec faucibus suscipit nulla eu interdum. In quis dignissim lorem, ut ullamcorper metus. Praesent tincidunt at tortor ut consequat. Duis pretium cursus ante id placerat. Suspendisse tristique iaculis pulvinar. Vestibulum eget elit efficitur, tincidunt neque in, auctor mi."
        }
    ];
    
function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        
        console.log("removed all campgrounds!");
        // add a few campgrounds
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             // create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is awesome!!",
        //                     author: "Görkem"
        //                 }, function (err, comment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;