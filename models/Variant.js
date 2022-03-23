const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name must be unique'],
        unique: [true, 'category name must be unique']
    },
    options: [
        { type: mongoose.Schema.ObjectId, ref: 'SubCategory', default: [] }
    ]
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
