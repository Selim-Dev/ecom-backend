const mongoose = require('mongoose');
// const SubCategory = require('./SubCategory');
const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shippingAddress: {
        country: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        }
    },
    status: {
        type: String,
        enum: ['pending', 'on_the_way', 'delivered', 'canceled', 'retrieved']
    },
    totalPrice: Number,
    paymentType: {
        type: String,
        enum: ['cash_on_delivery', 'card']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order Must Belong To a User']
    }
});

exports.Order = mongoose.model('Order', OrderSchema);
