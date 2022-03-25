const joi = require('joi');

exports.createOrderJoi = (Order) => {
    const schema = joi.object({
        code: joi.string().required(),
        discount: joi.number().required(),
        usersNumber: joi.number().required(),
        DiscountMethod: joi.string().required().valid('percentage', 'amount'),
        startAt: joi.date().required(),
        endAt: joi.date().required()
    });
    const validationResult = schema.validate(Order);

    return validationResult.error;
};
exports.updateOrderJoi = (Order) => {
    const schema = joi.object({
        code: joi.string(),
        discount: joi.number(),
        usersNumber: joi.number(),
        DiscountMethod: joi.string().valid('percentage', 'amount'),
        startAt: joi.date(),
        endAt: joi.date()
    });
    const validationResult = schema.validate(Order);

    return validationResult.error;
};
