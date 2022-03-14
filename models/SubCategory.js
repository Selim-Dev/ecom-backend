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

exports.SubCategories = mongoose.model('SubCategory', subCategoriesSchema);
