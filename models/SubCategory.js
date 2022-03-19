const mongoose = require('mongoose');

const subCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
});

const subCategories = mongoose.model('subCategories', subCategoriesSchema)

module.exports = subCategories;
