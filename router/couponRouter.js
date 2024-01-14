const express=require('express');
const {createCoupon,deleteCoupon,getCoupons,updateCoupon} =require('../controller/couponController.js');
const router =express.Router();
const authController = require('../controller/authController.js');

router.route('/').get(getCoupons).post(
    // authController.protect,
    createCoupon);
router.route('/:id').put(
    // authController.protect,
    updateCoupon).delete(deleteCoupon);

module.exports=router;