const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        price : joi.number().required(),
        country : joi.string().required(),
        image : joi.string().allow("", null),
        location : joi.string().required()

    }).required()
})

module.exports.reviewSchema = joi.object({
    reviews : joi.object({
        comment : joi.string().required(),
        rating : joi.number().required().min(1).max(5)
    }).required()
})