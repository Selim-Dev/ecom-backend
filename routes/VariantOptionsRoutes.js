const express = require('express');

const router = express.Router();
const variantOptionsController = require('../controllers/variantOptionsController');

router.route('/:id').get(variantOptionsController.getVariantOption);

router
    .route('/')
    .get(variantOptionsController.getAllVariantOptions)
    .post(variantOptionsController.createVariantOption);

router
    .route('/:id')
    .patch(variantOptionsController.updateVariantOption)
    .delete(variantOptionsController.deleteVariantOption);

module.exports = router;
