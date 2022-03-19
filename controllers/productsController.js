const Product = require('../models/Product');
const factory = require('./handlerFactory');

// exports.createProduct = async (req, res, next) => {
//     const {
//         name,
//         photo,
//         album,
//         description,
//         seller,
//         price: { salePrice, listPrice },
//         sku,
//         stock
//     } = req.body;
//     try {
//         let product = await Product.findOne({ sku });
//         if (product) {
//             throw new Error('product Sku number found in the database');
//         }
//         product = new Product({
//             name,
//             photo,
//             album,
//             description,
//             seller,
//             price: { salePrice, listPrice },
//             sku,
//             stock
//         });
//         const createdProduct = await product.save();
//         res.send(createdProduct);
//     } catch (error) {
//         error.statusCode = 500;
//         next(error);
//     }
// };
exports.createProduct = factory.createOne(Product);
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
