const asyncHandler = require('express-async-handler');
const ApiError=require('../utils/apiError.js');
const ApiFeatures=require('../utils/apiFeatures.js');
const slugify=require('slugify');
const userModel = require('../models/userModel.js');
const Product = require('../models/productModel');
const cartModel = require('../models/cartModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');


exports.createCashOrder = asyncHandler(async (req, res, next) => {
    const taxPrice = 0;
    const shippingPrice = 0;

    // get cart depend on cartId
    const cart = await cartModel.findById(req.params.cartId);
     if (!cart) {
       return next(new ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
     }
  // get order price 
    const cartPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount: cart.totalCartPrice;

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
     //Create order with paymentType cash
      const order = await orderModel.create({
       user: req.user._id,
       cartItems: cart.cartItems,
       shippingAddress: req.body.shippingAddress,
        totalOrderPrice,});
        // 4) After creating order, decrement product quantity, increment product sold
        if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
           updateOne: {
            filter: { _id: item.product },
            update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },},}
            ));
            await productModel.bulkWrite(bulkOption, {});
            await cartModel.findByIdAndDelete(req.params.cartId);
        }
        res.status(201).json({ status: 'success', data: order });
     });