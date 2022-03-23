const SubCategory = require('../models/SubCategory');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/Category');

exports.getAll = factory.getAll(SubCategory);
exports.creatSubCategory = catchAsync(async (req, res, next) => {
    const { name, photo, category: categoryId, brands } = req.body;
    const subCategory = await SubCategory.create({ name, photo, brands });
    const cat = await Category.findOneAndUpdate(
        { _id: categoryId },
        {
            $push: { subCategories: subCategory._id }
        }
    );
    res.status(201).json({
        status: 'success',
        data: {
            data: subCategory
        }
    });
});
exports.getOne = factory.getOne(SubCategory);
exports.editById = factory.updateOne(SubCategory);
exports.deleteById = factory.deleteOne(SubCategory);
