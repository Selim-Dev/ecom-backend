const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authValidation = require('../validations/authenticationJoi');
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    authValidation.authValidate(req.body);
    const {
        name,
        email,
        password,
        passwordConfirm,
        role,
        address: { country, city, street, zip }
    } = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role,
        address: { country, city, street, zip }
    });
    createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('InCorrect Email or Password!', 401));
    }
    createAndSendToken(user, 200, res);
});
exports.logout = (req, res) => {
    res.cookie('jwt', 'logged out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError(
                'You are not logged in! Please Login to get access',
                401
            )
        );
    }
    const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
        {}
    );
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token no longer exists.',
                401
            )
        );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User Recently Changed the Password, Please Login Again',
                401
            )
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
exports.restrictTo =
    (...roles) =>
    (req, res, next) => {
        // roles [ 'admin','seller','user']
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'YOu are not authorized to perform this action',
                    403 // 403 forbidden
                )
            );
        }
        next();
    };
