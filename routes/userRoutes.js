const express = require('express');
const authController = require('../controllers/authenticationController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/wishlist/:id')
    .post(userController.addWishList)
    .delete(userController.deleteWishList)

module.exports = router;
