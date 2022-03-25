const SubCategory = require('../models/SubCategory');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/Category');
const AppError = require('../utils/appError');
const Product = require('../models/Product');
const ProductReviews = require('../models/ProductReview');


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

/// Delete SubCat and the product, Review associated with this SubCat //// 
exports.deleteById = catchAsync(async (req, res, next) => {

    const subCat = await SubCategory.findOneAndDelete(req.params.id) // Delete subCat
    if (!subCat) {
        return next(new AppError(`No document Found With That id`, 404));
    }

    const prod = await Product.find({ subCategory: req.params.id }); // git Product = [ arr of products ]

    await prod.forEach(
        async (productt) =>
            await ProductReviews.findOneAndDelete({ product: productt._id })
    ); // Delete Review

    await Product.deleteMany({
        subCategory: req.params.id
    }); // delete product

    res.status(204).json({
        status: 'success Your SubCategory is deleted',
        data: null
    });


})
