const express = require('express')
const app = express();
const users = require('./routes/users')
const posts = require('./routes/posts')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const path = require('path');
const flash = require('express-flash');
//USERS ROUTES
app.use(cookieParser("secret"));
app.use(flash());
app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(expressSession({
    secret : "mysecret",
    resave : false,
    saveUninitialized : true
}))
app.use('/users', users);

//POST ROUTES
app.use('/posts', posts);

// app.get('/getcookies', (req, res)=>{
//     res.cookie("first", "Ayush");
//     res.cookie("last", "Gupta");
//     res.send("send you cookies");
// })
// //signed cookies
// app.get("/signedcookies", (req, res)=>{
//     res.cookie("made-in", "india", {signed: true});
//     res.send("signed cookie send");
// })

// app.get('/verifycookie', (req, res)=>{
//     console.dir(req.signedCookies);
//     res.send("signedCookies received");
// })

// app.get('/', (req, res)=>{
//     console.dir(req.cookies);
//     console.log('hi i am root');
// })

//express-session

// app.get('/test', (req, res)=>{
//     res.send("test successfull");
// })

// app.get('/reqcount', (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you requested ${req.session.count}`);
// })


//storing and using session info

app.get('/register', (req, res)=>{
    const {name = ananomous} = req.query;
    req.session.name = name;
    req.flash("success", "successfully registered!");
    req.flash("Error", "successfully not registered!");
    res.redirect('/hello')
})

app.get('/hello', (req, res)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("Error");
    res.render('index.ejs', {name : req.session.name});
    // res.render('index.ejs', {name : req.session.name, msg : req.flash("welcome")});
})














app.listen(3000, ()=>{
    console.log('port is listening at 3000');
})