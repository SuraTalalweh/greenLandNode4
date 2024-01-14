const express = require('express');
const {addProductToCart,clearCart,} = require('../controller/cartController.js');
const authController = require('../controller/authController.js');
const router = express.Router();
router.route('/').post(
    authController.protect,
    addProductToCart)
    .delete(
        authController.protect,
        clearCart);

// router.put('/applyCoupon', applyCoupon);

module.exports = router;