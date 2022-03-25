// const express = require('express')
const mongoose = require('mongoose');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.getAll = factory.getAll(Order, {
    path: 'orderItems'
});
exports.creatOrder = catchAsync(async (req, res, next) => {
    const { shippingAddress, location, paymentMethod, userId, orderItems } =
        req.body;
    //1) Get the total price of the orders
    let price = 0;
    orderItems.forEach((item) => {
        price += item.price;
    });
    // 2) check for coupons and throw error if coupon is wrong

    // 3) calculate total price after discount if coupon exist
    // open a session for transactions
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // my logic here
        // 1) create the order and save it
        const order = await Order.create({
            shippingAddress,
            location,
            paymentMethod,
            user: userId,
            status: 'pending'
        });

        // 2) create order items and save them
        orderItems.forEach(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                return next(new AppError(`No Product Found With That id`, 404));
            }
            if (product.stock < item.quantity) {
                return next(
                    new AppError(
                        `Product ${product.name} has maximum of ${product.stock} in stock`,
                        404
                    )
                );
            }
            OrderItem.create({
                name: item.name,
                price: item.price,
                order: order._id,
                product: item.productId,
                category: item.categoryId,
                subCategory: item.subCategoryId,
                seller: item.sellerId,
                user: userId,
                status: 'pending',
                variants: product.variants
            });
        });
        // 2) foreach order item reduce the product stock by the item numbers

        // 3) create transactions
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }

    res.status(200).json({
        status: 'success',
        data: order
    });
});

exports.getOne = factory.getOne(Order);
exports.editById = factory.updateOne(Order);

exports.deleteById = catchAsync(async (req, res, next) => {
    res.status(204).json({
        status: 'success Your Order is deleted',
        data: null
    });
});
