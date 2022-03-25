
const orderItem = require('../models/OrderItem')
// const orderItemRouter = require('../routes/orderItemRoutes')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getById = catchAsync(async (req, res, next) => {
    const getOrderItemById = await orderItem.findById(req.params.id)
    if (!getOrderItemById) {
        return next(new AppError(`No document Found With That id`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            data: getOrderItemById
        }
    })

})
exports.editById = catchAsync(async (req, res, next) => {

    const { status } = req.body
    console.log(status)

    const editstatus = await orderItem.findByIdAndUpdate(req.params.id, { status: status }, { new: true, runValidators: true })
    if (!editstatus) {
        return next(new AppError(`No document Found With That id`, 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: editstatus
        }
    })
})
