const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,

    },
    subCategories:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    }

});

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;



