const express = require('express');

const router = express.Router();
const variantController = require('../controllers/variantController');

router.route('/:id').get(variantController.getVariant);

router
    .route('/')
    .get(variantController.getAllVariants)
    .post(variantController.createVariant);

router
    .route('/:id')
    .patch(variantController.updateVariant)
    .delete(variantController.deleteVariant);

module.exports = router;
