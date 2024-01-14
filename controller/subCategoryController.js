const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const ApiError=require('../utils/apiError.js');
const ApiFeatures=require('../utils/apiFeatures.js');
const subCategoryModel=require('../models/subCategoryModel.js');
exports.setCategoryIdToBody=(req,res,next)=>{
     // nested route
     if(!req.body.category) req.body.category=req.params.categoryId;
     next();
}


exports.createSubCategory=asyncHandler(async(req,res)=>{
    const {name,category}=req.body;
    const subCategory=await subCategoryModel.create({name,slug:slugify(name),category});
    res.status(201).json({data:subCategory});
 });

 exports.createFilterObj=(req,res,next)=>{
    let filterObject={};
    if(req.params.categoryId) filterObject={category:req.params.categoryId};
    req.filterObj=filterObject;
    next();
 }

 exports.getSubCategories=asyncHandler(async(req,res)=>{
    // const page=req.query.page*1 ||1;
    // const limit=req.query.limit*1 || 5;
    // const skip=(page-1)*limit;
//    const subCategories=await subCategoryModel.find(req.filterObj).skip(skip).limit(limit)
//    .populate({path:'category',select:'name -_id'});
  
const documentsCount= await subCategoryModel.countDocuments();
const apiFeatures= new ApiFeatures(subCategoryModel.find(),req.query).paginate(documentsCount)
.filter().search().limitFields().sort();

const {mongooseQuery, paginationResult}=apiFeatures;
const subCategories= await mongooseQuery;
    res.status(200).json({results:subCategories.length,paginationResult,data:subCategories});

});

exports.getSpecificSubCategory=asyncHandler(async (req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    const subCategory=await subCategoryModel.findById(id)
    // .populate({
    //     path:'category',
    //     select:'name -_id' 
    // });
    if(!subCategory){
        return next(new ApiError(`Not found subCategory for this id ${id}`,404));
    }
    res.status(200).json({data:subCategory});
});

exports.updateSubCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const {name,category}=req.body;
    const subCategory= await subCategoryModel.findOneAndUpdate(
        {_id:id},{name,slug:slugify(name),category},{new:true}
    );
    if(!subCategory){
        return next(new ApiError(`Not found subCategory for this id ${id}`,404));
    }
    res.status(200).json({data:subCategory});
});
exports.deletesubCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const subCategory= await subCategoryModel.findByIdAndDelete(id);
    if(!subCategory){
        return next(new ApiError(`Not found subCategory for this id ${id}`,404));
    }
    res.status(204).send();
});