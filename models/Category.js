const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    },
    photo: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    subCategories: [
        { type: mongoose.Schema.ObjectId, ref: 'SubCategory', default: [] }
    ]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
