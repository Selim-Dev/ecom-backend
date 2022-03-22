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

    variants: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Varient',
        default: []
    }
});

const subCategories = mongoose.model('SubCategory', subCategoriesSchema);

module.exports = subCategories;
