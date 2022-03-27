// const express = require('express')
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const ProductReviews = require('../models/ProductReview');
const AppError = require('../utils/appError');
const catJoi = require('../validations/categoryJoi');
const cloudinary = require('../utils/cloudinary');

exports.getAll = factory.getAll(Category);
exports.creatCategory = catchAsync(async (req, res, next) => {
    const validateCat = catJoi.categoryJoi(req.body);
    if (validateCat) {
        return next(new AppError(validateCat.message, 400));
    }
    if (!req.file) {
        return next(new AppError('Please upload a file', 400));
    }
    const { name } = req.body;

    const response = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'ecommerce'
    });
    console.log(response);
    if (!response) {
        return next(new AppError('Photo Not Uploaded', 400));
    }
    const creatCat = await Category.create({
        name,
        photo: response.url
            ? `${response.public_id}.${response.format}`
            : undefined
    });
    if (!creatCat) {
        return next(new AppError('Category not created', 400));
    }
    res.status(201).json({
        status: 'success',
        data: {
            data: creatCat
        }
    });
});
exports.getOne = factory.getOne(Category);

exports.editById = catchAsync(async (req, res, next) => {
    const validatecontact = catJoi.editcCtegoryJoi(req.body);
    if (validatecontact) {
        return next(new AppError(validatecontact.message, 400));
    }
    await cloudinary.uploader.destroy('ecommerce/dqolvcg5197ptgdmxcwm', {
        upload_preset: 'ecommerce'
    });
    const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updateCategory) {
        return next(new AppError(`No document Found With That id`, 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: updateCategory
        }
    });
});

exports.deleteById = catchAsync(async (req, res, next) => {
    const cat = await Category.findById(req.params.id); //get All Categories
    if (!cat) {
        return next(new AppError(`No document Found With That id`, 404));
    }
    await cat.subCategories.forEach(
        async (e) => await SubCategory.findByIdAndDelete(e)
    ); // Delete All SubCateg

    const prod = await Product.find({ category: req.params.id }); // git Product
    await prod.forEach(
        async (productt) =>
            await ProductReviews.findOneAndDelete({ product: productt._id })
    ); // Delete Review

    await Product.deleteMany({
        category: req.params.id
    }); // delete product
    console.log(cat.photo);
    await cloudinary.uploader.destroy('q59lvg8b8ydkgpfixkwd.jpg', {
        upload_preset: 'ecommerce'
    });
    await Category.findByIdAndDelete(req.params.id); // delete Category
    res.status(204).json({
        status: 'success Your Category is deleted',
        data: null
    });
});
