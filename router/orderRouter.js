const express = require('express');
const {createCashOrder} = require('../controller/orderController.js');

const authController = require('../controller/authController.js');

const router = express.Router();

// router.use(authController.protect);
router.route('/:cartId').post(
    // authController.protect,
     createCashOrder);

module.exports = router;