const joi = require('joi');

exports.categoryJoi = (category) => {
    const schema = joi.object({
        name: joi.string().required(),
        photo: joi.string().required()
    });
    const validationResult = schema.validate(category);

    return validationResult.error;
};
exports.editcCtegoryJoi = (category) => {
    const schema = joi.object({
        name: joi.string(),
        photo: joi.string().required()
    });
    const validationResult = schema.validate(category);

    return validationResult.error;
};
