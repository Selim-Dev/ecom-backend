exports.authValidate = (user) => {
    const schema = joi.object({
        name: joi.string().alphanum().required(),
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().min(3).required(),
        passwordConfirm: joi.ref('password'),
        role: joi.string().required(),
        address: {
            country: joi.string().required(),
            city: joi.string().required(),
            street: joi.string().required(),
            zip: joi.number().integer()
        }
    });
    return schema.validate(user);
    // console.log(result);
    // return result;
};
