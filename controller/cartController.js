const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const productModel = require('../models/productModel');
const couponModel = require('../models/couponModel');
const cartModel = require('../models/cartModel');



exports.addProductToCart=asyncHandler(async(req,res,next)=>{
  const {productId,quantity}=req.body;
    const cart= await cartModel.findOne({userId:req.user._id});
    if(!cart){
        const newCart=await cartModel.create({
            userId:req.user._id,
            products:{productId,quantity}
        })
        res.status(201).json({message:"success",newCart});
    }
    let matchedProduct=false;
    for(let i=0;i<cart.products.length;i++){
        if(cart.products[i].productId==productId){
            cart.products[i].quantity=quantity;
            matchedProduct=true;
            break;
        }
    }
    if(!matchedProduct){
        cart.products.push({productId,quantity});
    }
    await cart.save();
   return res.status(201).json({message:"success",cart})


});


exports.clearCart = asyncHandler(async (req, res, next) => {
      await cartModel.findOneAndDelete({ user: req.user._id });
      res.status(204).send();
 });
  
  