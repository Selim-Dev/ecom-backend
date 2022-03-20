const mongoose = require('mongoose');

const subCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    },
    photo: {
        type: String
    }
});

const subCategories = mongoose.model('subCategories', subCategoriesSchema);

module.exports = subCategories;
