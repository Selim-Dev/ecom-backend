const mongoose = require('mongoose');

const subCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    },
    photo: {
        type: String
    },
    variants: [{ type: mongoose.Schema.ObjectId, ref: 'Variant', default: [] }],
    brands: [{ type: mongoose.Schema.ObjectId, ref: 'Brand', default: [] }]
});

const subCategories = mongoose.model('SubCategory', subCategoriesSchema);

module.exports = subCategories;
