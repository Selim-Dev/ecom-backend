
const catchAsync = require('../utils/catchAsync');

const subCategory = require('../models/SubCategory')

exports.getAll = catchAsync(async (req, res) => {

    const getAllCategory = await subCategory.find()
    res.status(200).json({
        status: "success",
        data: getAllCategory
    })

})

exports.getOne = catchAsync(async (req, res) => {

    const gitSubCategoryById = await subCategory.findById(req.params.id)
    res.status(200).json({
        status: "success",
        data: gitSubCategoryById
    })

})

exports.creatSubCategory = catchAsync(async (req, res) => {
    const addSubCategory = await subCategory.create(req.body)

    res.status(200).json({
        status: "success",
        data: addSubCategory
    })
})

exports.editById = catchAsync(async (req, res) => {
    const editSubCategory = await subCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(editSubCategory)

    res.status(200).json({
        status: "Success",
        data: editSubCategory
    })
})

exports.deleteById = catchAsync(async (req, res) => {
    const deleteSubCategory = await subCategory.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status: "Success",
        data: deleteSubCategory
    })
})
