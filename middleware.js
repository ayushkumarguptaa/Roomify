const Reviews = require("./models/reviews");

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login first");
        return res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        req.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await findById(id);
    if(listing.owner._id.equals(req.locals.curUser._id)){
        req.flash("error", "you don't have permission to edit");
        return redirect(`/listings/${id}`)
    }
    next()
}



module.exports.isReviewAuthor = async(req, res, next)=>{
    let {id, reviewId} = req.params;
    let review = await Reviews.findById(reviewId);
    if(!review.author._id.equals(req.locals.curUser._id)){
        req.flash("error", "you have no permission")
        res.redirect(`/listings/${id}`)
    }
}