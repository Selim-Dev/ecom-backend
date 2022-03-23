const mongoose = require('mongoose');
// const SubCategory = require('./SubCategory');
const OrderItemSchema = new mongoose.Schema({
    test: { type: String },
    name: {
        type: String,
        required: true
    },
    price: Number,
    status: {
        type: String,
        enum: ['pending', 'on_the_way', 'delivered', 'canceled', 'retrieved']
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: [true, 'Order Item Must Belong To an Order']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Order Item Must Belong To a category']
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
        required: [true, 'Order Item Must Belong To a sub category']
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order Item Must Belong To a Seller']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order Item Must Belong To a User']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

exports.OrderItem = mongoose.model('OrderItem', OrderItemSchema);
