const express = require('express');

const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController')



router
    .route('/:id')
    .get(subCategoryController.getOne)

router
    .route('/')
    .get(subCategoryController.getAll)
    .post(subCategoryController.creatSubCategory)

router
    .route('/:id')
    .patch(subCategoryController.editById)
    .delete(subCategoryController.deleteById);


module.exports = router;