const express = require('express');

const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController')

const authController = require('../controllers/authenticationController');


router
    .route('/:id')
    .get(subCategoryController.getOne)


router
    .route('/')
    .get(subCategoryController.getAll)

router.use(authController.protect); ///////

router
    .route('/')
    .post(
        authController.restrictTo('admin', 'user'),
        subCategoryController.creatSubCategory
    )

router
    .route('/:id')
    .patch(
        authController.restrictTo('admin', 'user'),
        subCategoryController.editById
    )
    .delete(
        authController.restrictTo('admin', 'user'),
        subCategoryController.deleteById
    );


module.exports = router;