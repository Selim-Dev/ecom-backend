const joi = require('joi');

exports.subcatJoi = (subCategory) => {

    const schema = joi.object({
        name: joi.string().alphanum().required(),
        photo: joi.string().required(),
        category: joi.string().required(),
        brands: joi.array()
    });
    const validationResult = schema.validate(subCategory);


    return validationResult.error

};

exports.editsubcatJoi = (subCategory) => {

    const schema = joi.object({
        name: joi.string().alphanum(),
        photo: joi.string(),
        category: joi.string(),
        brands: joi.array()
    });
    const validationResult = schema.validate(subCategory);


    return validationResult.error

};

