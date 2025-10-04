const mongoose = require('mongoose');
const Reviews = require('./reviews')

let listingSchema = mongoose.Schema({
    title:{
         type: String,
         required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/3d-render-of-luxury-hotel-room-with-double-bed-gTA4bkiD2Xw",
        set: (v)=>v == ""? "https://unsplash.com/photos/3d-render-of-luxury-hotel-room-with-double-bed-gTA4bkiD2Xw":v,
    },
    price: Number,
    location: String,
    country: String,
    reviews : [{type : mongoose.Schema.ObjectId , ref : "Reviews"}],
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});







listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Reviews.deleteMany({_id : {$in : listing.reviews}});
    }
})

let Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;