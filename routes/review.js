const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError')
const Reviews = require('../models/reviews')
const {listingSchema, reviewSchema} = require('../schema')
const Listing = require('../models/listing');
const {isLoggedIn, isReviewAuthor } = require('../middleware');


const validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){ throw new ExpressError(404, error)}
    else{
        next();
    }
}


//POST review route
router.post("/",validateReview, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listingData =await Listing.findById(id);
    let newReview = new Reviews(req.body.reviews);
    newReview.author = req.user._id;
    listingData.reviews.push(newReview);

    await newReview.save();
    await listingData.save();
    res.redirect(`/listings/${listingData._id}`);
}))

router.delete("/:reviewId",isLoggedIn , isReviewAuthor, wrapAsync(async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Reviews.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)

}))

module.exports = router;