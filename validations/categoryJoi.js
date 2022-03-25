const joi = require('joi');

exports.categoryJoi = (category) => {
    const schema = joi.object({
        name: joi.string().alphanum().required(),
        photo: joi.string().alphanum().required()
    });
    const validationResult = schema.validate(category);

    return validationResult.error;
};
