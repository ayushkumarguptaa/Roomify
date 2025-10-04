
const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    createdAt : {
        type : Date,
        default : Date.now()

    }
})

let Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;