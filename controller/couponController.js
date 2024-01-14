const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');
const couponModel = require('../models/couponModel');

exports.createCoupon=asyncHandler(async(req,res,next)=>{
    const {name}=req.body;
    req.body.expire= new Date(req.body.expire);
    if(await couponModel.findOne({name})){
        return res.status(409).json({message:"This Coupon already exists"});
    }
    const coupon=await couponModel.create(req.body);
    return res.status(201).json({message:"success",coupon});
});

exports.getCoupons=asyncHandler(async(req,res,next)=>{
    const coupons=await couponModel.find({isDeleted:false});
    return res.status(200).json({message:"success",coupons})
})

exports.updateCoupon=asyncHandler(async(req,res,next)=>{
    const coupon=await couponModel.findById(req.params.id);
    if(!coupon){
        return res.status(404).json({message:" coupon not  found"});
    }
    if(req.body.name){
        if(await couponModel.findOne({name:req.body.name}).select('name')){
            return res.status(409).json({message:`coupon ${req.body.name} alredy exists`});
        }
        coupon.name=req.body.name;
    }
    if(req.body.amount){
        coupon.amount=req.body.amount;
    }
    await coupon.save();
    return res.status(200).json({message:'updated success',coupon});
});

exports.deleteCoupon=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const coupon=await couponModel.findOneAndDelete({_id:id});
    if(!coupon){
        return res.status(404).json({message:" can not delete this coupon"});
    }
    return res.status(200).json({message:" success"});
})