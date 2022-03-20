const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Size name is required'],
        unique: [true, 'Size name must be unique']
    },
    abbreviation: {
        type: String,
        required: [true, 'Size abbreviation is required'],
        unique: [true, 'Size abbreviation must be unique']
    }
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
