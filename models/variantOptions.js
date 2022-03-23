const mongoose = require('mongoose');

const variantOptionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    }
});

const VariantOptions = mongoose.model('VariantOptions', variantOptionsSchema);

module.exports = VariantOptions;
