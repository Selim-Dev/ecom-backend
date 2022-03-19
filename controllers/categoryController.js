
// const express = require('express')
const catchAsync = require('../utils/catchAsync');

const category = require('../models/Category')
// const SubCategory = require('../models/SubCategory')

exports.getAll = catchAsync(async (req, res) => {

    const getAllCategory = await category.find()
    res.status(200).json({
        status: "success",
        data: getAllCategory
    })

})

exports.getOne = catchAsync(async (req, res) => {

    const gitCategoryById = await category.findById(req.params.id)
    res.status(200).json({
        status: "success",
        data: gitCategoryById
    })

})

exports.creatCategory = catchAsync(async (req, res) => {

    const addCategory = await category.create(req.body)

    res.status(200).json({
        status: "success",
        data: { data: addCategory }
    })
})

exports.editById = catchAsync(async (req, res) => {
    const editCategory = await category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(editCategory)
    res.status(200).json({
        status: "Success",
        data: editCategory
    })
})

exports.deleteById = catchAsync(async (req, res) => {
    const deleteCategory = await category.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "Success",
        data: deleteCategory
    })
})
