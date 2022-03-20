const subCategory = require('../models/SubCategory');
const factory = require('./handlerFactory');

exports.getAll = factory.getAll(subCategory);
exports.creatSubCategory = factory.createOne(subCategory);
exports.getOne = factory.getOne(subCategory);
exports.editById = factory.updateOne(subCategory);
exports.deleteById = factory.deleteOne(subCategory);
