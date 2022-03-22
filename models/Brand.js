const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        unique: [true, 'Brand name must be unique']
    },
    subCategories: [
        { type: mongoose.Schema.ObjectId, ref: 'SubCategory', default: [] }
    ]
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
