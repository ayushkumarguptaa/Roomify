const express = require('express')
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError')
const listings = require('./routes/listing.js')
const review = require('./routes/review.js')
const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js')
const user = require('./routes/user.js')


app.use(expressSession({
    secret : "mynewsecret",
    resave : false,
    saveUninitialized : true,
    cookie: {
        expire : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000
    }

}));
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(flash())


const mongoUrl = "mongodb://localhost:27017/wanderlust";
async function connection(){
    await mongoose.connect(mongoUrl);
}
connection()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
})

app.get('/',(req, res)=>{
    res.send("Hi i'm root");
})



app.use('/listings/:id/reviews', review);
app.use('/listings', listings);
app.use('/', user);




app.all('*', (req, res, next)=>{
    next(new ExpressError(404, "Page not found!!"));
})


app.use((err, req, res, next)=>{
    let {status = 404, message = "Something Went Wrong"} = err;
    res.render('error.ejs', {err});
    res.status(status).send(message);
})



app.listen(8080, ()=>{
    console.log("server listening on port 8080");
})