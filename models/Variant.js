const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    },
    options: [String]
});

const subCategories = mongoose.model('subCategories', variantSchema);

module.exports = subCategories;
