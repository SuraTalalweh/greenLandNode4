const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const brandModel=require('../models/brandModel.js');
const ApiError=require('../utils/apiError.js');
const ApiFeatures=require('../utils/apiFeatures.js');
//send error for global by using next 
exports.getBrands=asyncHandler(async(req,res)=>{
    const documentsCount= await brandModel.countDocuments();
    const apiFeatures= new ApiFeatures(brandModel.find(),req.query).paginate(documentsCount)
    .filter().search().limitFields().sort();

    const {mongooseQuery, paginationResult}=apiFeatures;
    const brands= await mongooseQuery;
    
   res.status(200).json({results:brands.length,paginationResult,data:brands});
//    res.send();
});

exports.getSpecificBrand=asyncHandler(async (req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    const brand=await brandModel.findById(id);
    if(!brand){
        return next(new ApiError(`Not found Brand for this id ${id}`,404));
    }
    res.status(200).json({data:brand});
});

exports.createBrand=asyncHandler(async(req,res)=>{
   const {name}=req.body;
   const brand=await brandModel.create({name,slug:slugify(name)});
   res.status(201).json({data:brand});
});
exports.updateBrand=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const {name}=req.body;
    const brand= await brandModel.findOneAndUpdate(
        {_id:id},{name,slug:slugify(name)},{new:true}
    );
    if(!brand){
        return next(new ApiError(`Not found Brand for this id ${id}`,404));
    }
    res.status(200).json({data:brand});
});
exports.deleteBrand=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const brand= await brandModel.findByIdAndDelete(id);
    if(!brand){
        return next(new ApiError(`Not found Brand for this id ${id}`,404));
    }
    res.status(204).send();
});