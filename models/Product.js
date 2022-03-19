const mongoose = require('mongoose');
// const SubCategory = require('./SubCategory');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    album: [String],
    // category: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Category',
    //     required: [true, 'Order Must Belong To a Seller']
    // },
    // subCategory: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'SubCategory',
    //     required: [true, 'Order Must Belong To a Seller']
    // },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Product Must Belong To a Seller']
    },
    price: {
        salePrice: Number,
        listPrice: Number
    },
    sku: {
        type: Number,
        unique: true
    },
    stock: Number,
    ratingsAverage: {
        type: Number,
        default: 4,
        min: [1, 'Rating Must be Greater than or equal to 1'],
        max: [5, 'Rating Must be Less than or equal to 5'],
        set: (val) => Math.round(val * 10) / 10
    },
    ratingsQuantitiy: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    is_featured: {
        type: Boolean,
        default: false
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;