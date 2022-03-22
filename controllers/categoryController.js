// const express = require('express')
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.getAll = factory.getAll(Category);
exports.creatCategory = factory.createOne(Category);
exports.getOne = factory.getOne(Category);
exports.editById = factory.updateOne(Category);
exports.deleteById = catchAsync(async (req, res, next) => {
    // const category = await Category.findById(req.params.id);
    // const SubCategory = Category.subCategories.forEach((id))
    // await Category.findByIdAndDelete(req.params.id);
    const doc = await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
