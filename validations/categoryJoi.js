const joi = require('joi');

exports.categoryJoi = (category) => {
    const schema = joi.object({
        name: joi.string().alphanum().required(),
        photo: joi.string().alphanum().required()
    });
    const validationResult = schema.validate(category);

    return validationResult.error;
};
exports.editcCtegoryJoi = (category) => {
    const schema = joi.object({
        name: joi.string().alphanum(),
        photo: joi.string().required()
    });
    const validationResult = schema.validate(category);

    return validationResult.error;
};