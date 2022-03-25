// const express = require('express')
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const ProductReviews = require('../models/ProductReview');
const AppError = require('../utils/appError');

exports.getAll = factory.getAll(Category);
exports.creatCategory = factory.createOne(Category);
exports.getOne = factory.getOne(Category);
exports.editById = factory.updateOne(Category);

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
    await Category.findByIdAndDelete(req.params.id); // delete Category
    res.status(204).json({
        status: 'success Your Category is deleted',
        data: null
    });
});
