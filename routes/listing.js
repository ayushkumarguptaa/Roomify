const express= require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError')
const {listingSchema, reviewSchema} = require('../schema')
const Listing = require('../models/listing');
const {isLoggedIn, isOwner} = require('../middleware')



//Eschema/Mongoose validation error
const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(404, error);
    }else{
        next();
    }
}

//index route
router.get("/", async(req, res)=>{
    let allListing = await Listing.find({});
    res.render("index.ejs", {allListing});
}
)
//new route
router.get("/new",isLoggedIn, (req, res)=>{
    console.log(req.user);
    res.redirect(req.session.redirectUrl);
    
})

//show route
router.get("/:id",wrapAsync(async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {                 //NESTED POPULATE
            path : "authore"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "listing not found!");
        res.redirect('/listings')
    }
    res.render("show.ejs", {listing});
})
)
//create route
router.post("/",validateListing, wrapAsync(async(req, res, next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "Listing Created!");
    res.redirect("/listings");
}
)
)
//edit route
router.get("/:id/edit", wrapAsync(async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", {listing});
}
)
)
//update route
router.put('/:id',isLoggedIn, isOwner, wrapAsync(async(req, res)=>{
let {id} = req.params;
await Listing.findByIdAndUpdate(id, {...req.body.listings});
req.flash("success", "Listing Updated Successfully!");
res.redirect("/listings");
})
)
//delete route
router.delete("/:id", wrapAsync(async(req, res)=>{
let {id} = req.params;
await Listing.findByIdAndDelete(id);
req.flash("success", "Listing Deleted!");
res.redirect("/listings");
})
)

module.exports = router;