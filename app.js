const express        = require("express")
    bodyParser     = require("body-parser")
    mongoose       = require("mongoose")
    flash          = require("connect-flash")
    app            = express()
    passport       = require("passport")
    LocalStrategy  = require("passport-local")
    methodOverride = require("method-override")
    User           = require("./models/user")

const commentRoutes    = require("./routes/comments")
      campgroundRoutes = require("./routes/campgrounds")
      indexRoutes      = require("./routes/index")
    
//console.log(process.env.DATABASEURL);

mongoose.connect('mongodb://localhost/yelp-camp', { useNewUrlParser: true })
.then(()=> {
    console.log('You did it! Your MongoDB is running.')
}).catch(err => {
    console.error('Something went wrong!')
    console.error(err)
})

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "this is gorkem speaking..",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting up current user and messages to every single template
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen('5000', function(){
    console.log("Yelp camp server has started");
});