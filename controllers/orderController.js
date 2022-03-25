// const express = require('express')
const mongoose = require('mongoose');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const orderJoi = require('../validations/orderJoi');

exports.getAll = factory.getAll(Order);
exports.creatOrder = catchAsync(async (req, res, next) => {
    const { shippingAddress, location, paymentMethod, userId, orderItems } =
        req.body;
    //1) Get the total price of the orders
    let totalPrice = 0;
    let order;
    orderItems.forEach(async (item) => {
        totalPrice += item.price * 1;
    });
    console.log(totalPrice);

    // 2) check for coupons and throw error if coupon is wrong

    // 3) calculate total price after discount if coupon exist
    // open a session for transactions
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // my logic here
        // 1) create the order and save it
        order = await Order.create({
            shippingAddress,
            location,
            paymentMethod,
            user: userId,
            status: 'pending',
            totalPrice: totalPrice
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
            const orderItemCreated = await OrderItem.create({
                name: product.name,
                // price: item.price,
                quantity: item.quantity,
                product: item.productId,
                order: order._id,
                category: product.category,
                subCategory: product.subCategory,
                seller: product.seller,
                user: userId,
                status: 'pending',
                variants: product.variants
            });
            await Order.findOneAndUpdate(
                { _id: order._id },
                {
                    $push: { orderItems: orderItemCreated._id }
                }
            );
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

exports.getOne = factory.getOne(Order, {
    path: 'orderItems',
    select: 'product price'
});

exports.deleteById = catchAsync(async (req, res, next) => {
    res.status(204).json({
        status: 'success Your Order is deleted',
        data: null
    });
});

exports.editById = catchAsync(async (req, res, next) => {
    const validatecontact = orderJoi.updateOrderJoi(req.body);
    if (validatecontact) {
        return next(new AppError(validatecontact.message, 400));
    }
    const updateorderItem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updateorderItem) {
        return next(new AppError(`No document Found With That id`, 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: updateorderItem
        }
    });
});
