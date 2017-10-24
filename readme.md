Each Campground has:
 * Name
 * Image
 * 
[
    {name: 'Erikli', image:'http://www.image.com'}
    {name: 'Erikli', image:'http://www.image.com'}
    {name: 'Erikli', image:'http://www.image.com'}
    {name: 'Erikli', image:'http://www.image.com'}
    {name: 'Erikli', image:'http://www.image.com'}
]

RESTFUL ROUTES

name        url            verb        desc.
========================================================
INDEX   /campgrounds       GET      Display all the campgrounds
NEW     /campgrounds/new   GET      Displays a form to make a campground
CREATE  /campgrounds       POST     Add a new campground
SHOW    /campground/:id    GET      Shows info about the campground

NEW     /campground/:id/comment/new     GET
CREATE  /campground/:id/comments        POST
