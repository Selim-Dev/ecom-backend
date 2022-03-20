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
    subCategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory'
        }
    ]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
