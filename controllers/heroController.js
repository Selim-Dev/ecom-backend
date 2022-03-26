const multer = require('multer');
const sharp = require('sharp');
const Hero = require('../models/Hero');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');

// // create multer upload
// when we do image processing its better to use sharp and save the image to memory so we ca use it later as a buffer in sharp
// const multerStorage = multer.memoryStorage();
// // create multer filter
// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb(new AppError('Not an image! Please upload only images', 400), false);
//     }
// };

// const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// });

// exports.uploadHeroPhoto = upload.single('image');
// exports.resizeHeroPhoto = catchAsync(async (req, res, next) => {
//     if (!req.file) return next();
//     // we set the file name because when we save it to memory we don't set the filename
//     req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
//     sharp(req.file.buffer)
//         .resize(1360, 575)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/${req.file.filename}`);

//     next();
// });

// exports.uploadImage = catchAsync(async (req, res, next) => {
//     const response = await cloudinary.uploader.upload(req.file, {
//         upload_preset: 'ecommerce'
//     });
//     res.send(response);
//     // res.send(response);
// });

exports.createHero = catchAsync(async (req, res, next) => {
    const { title } = req.body;
    if (!req.file) {
        return next(new AppError('Please upload a file', 400));
    }
    // const response = await cloudinary.uploader.upload(req.file.path);
    const response = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'ecommerce'
    });
    if (!response) {
        return next(new AppError('Photo Not Uploaded', 400));
    }
    const hero = await Hero.create({
        title,
        image: response.secure_url,
        cloudinary_id: response.public_id
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: hero
        }
    });
});

exports.updateHero = catchAsync(async (req, res, next) => {
    const { name } = req.body;
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, {
        name,
        status: req.user.role === 'seller' ? 'Pending' : 'Active'
    });
    res.status(201).json({
        status: 'success',
        data: {
            data: updatedHero
        }
    });
});

exports.getAllHeros = factory.getAll(Hero);
exports.getHero = factory.getOne(Hero);
exports.deleteHero = factory.deleteOne(Hero);
