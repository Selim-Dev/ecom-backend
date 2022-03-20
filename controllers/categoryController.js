// const express = require('express')
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.getAll = factory.getAll(category);
exports.creatCategory = factory.createOne(category);
exports.getOne = factory.getOne(category);
exports.editById = factory.updateOne(category);
exports.deleteById = catchAsync(async (req, res, next) => {
    const doc = await category.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
