const express = require('express');

const router = express.Router({ mergeParams: true });
const productController = require('../controllers/productsController');
const authController = require('../controllers/authenticationController');

router.use(authController.protect);
router
    .route('/')
    .post(productController.createProduct)
    .get(productController.getAllProducts);
router
    .route('/:id')
    .get(productController.getProduct)
    .delete(
        authController.restrictTo('admin', 'seller'),
        productController.deleteProduct
    )
    .patch(
        authController.restrictTo('admin', 'seller'),
        productController.updateProduct
    );
module.exports = router;
