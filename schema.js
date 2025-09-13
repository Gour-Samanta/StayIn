const Joi = require("joi");

//server side validate
module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    country : Joi.string().required(),
    location : Joi.string().required(),

    image: Joi.object({
        url:Joi.string().allow("" ,null)
    })
});
 //validate review schema
module.exports.reviewSchema = Joi.object({
    comment : Joi.string().required(),
    rating: Joi.string().required().min(1).max(5)
});