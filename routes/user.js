const express = require('express')
const router = express.Router()
const User = require('../models/user')
const wrapAsync = require('../utils/wrapAsync');
const Passport = require('passport');
const { saveRedirectUrl } = require('../middleware');



    router.get('/signup', (req, res)=>{
    res.render('./user/signup.ejs');
    })

    router.post('/signup', wrapAsync(async(req, res)=>{
        const {username, email, password} = req.body;
        let newUser = new User({username, email});
        let regUser = await User.register(newUser, password);
        console.log(regUser);
        req.login(regUser, (err)=>{
            if(err) return next(err);
        })
        req.flash("success", "signup success");
        res.redirect('/listings');

    }))

    router.get('/login', (req, res)=>{
        res.render('./user/login.ejs');
    })

    router.post('/login',saveRedirectUrl, Passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), async(req, res)=>{
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect(res.locals.redirectUrl || "/listings");
    })

    router.get('/logout', (req, res, next)=>{
        req.logout(
            (err)=>{
                if(err){
                    return next(err)
                }
            }
        );
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect('/listings');
    })



module.exports = router