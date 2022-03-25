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
        status: joi
            .string()
            .required()
            .valid(
                'pending',
                'on_the_way',
                'delivered',
                'canceled',
                'retrieved',
                'partiallyDelivered'
            )
    });
    const validationResult = schema.validate(Order);

    return validationResult.error;
};
