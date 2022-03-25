const mongoose = require('mongoose');
// const SubCategory = require('./SubCategory');
const OrderSchema = new mongoose.Schema({
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
    location: {
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ['pending', 'on_the_way', 'delivered', 'canceled', 'retrieved']
    },
    totalPrice: Number,
    totalPriceAfterDiscount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'card'],
        default: 'cash_on_delivery'
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
    },
    cancelReason: {
        type: String
    },
    coupon: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coupon'
    },
    couponCode: String,
    discountValue: {
        type: Number,
        default: 0
    }
});
OrderSchema.virtual('orderItems', {
    ref: 'OrderItem',
    foreignField: 'order',
    localField: '_id'
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
