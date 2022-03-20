const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController')



router
    .route('/:id')
    .get(categoryController.getOne)

router
    .route('/')
    .get(categoryController.getAll)
    .post(categoryController.creatCategory)

router
    .route('/:id')
    .patch(categoryController.editById)
    .delete(categoryController.deleteById);


module.exports = router;
