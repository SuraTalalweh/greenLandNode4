const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const CategoryModel=require('../models/categoryModel.js');
const ApiError=require('../utils/apiError.js');
const ApiFeatures=require('../utils/apiFeatures.js')
//send error for global by using next 
exports.getCategories=asyncHandler(async(req,res)=>{
    const documentsCount= await CategoryModel.countDocuments();
    const apiFeatures= new ApiFeatures(CategoryModel.find(),req.query).paginate(documentsCount)
    .filter().search().limitFields().sort();

    const {mongooseQuery, paginationResult}=apiFeatures;
    const categories= await mongooseQuery;
   res.status(200).json({results:categories.length,paginationResult,data:categories});

});

exports.getSpecificCategory=asyncHandler(async (req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    const category=await CategoryModel.findById(id);
    if(!category){
        return next(new ApiError(`Not found Category for this id ${id}`,404));
    }
    res.status(200).json({data:category});
});

exports.createCategory=asyncHandler(async(req,res)=>{
   const {name}=req.body;
   const category=await CategoryModel.create({name,slug:slugify(name)});
   res.status(201).json({data:category});
});
exports.updateCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const {name}=req.body;
    const category= await CategoryModel.findOneAndUpdate(
        {_id:id},{name,slug:slugify(name)},{new:true}
    );
    if(!category){
        return next(new ApiError(`Not found Category for this id ${id}`,404));
    }
    res.status(200).json({data:category});
});
exports.deleteCategory=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const category= await CategoryModel.findByIdAndDelete(id);
    if(!category){
        return next(new ApiError(`Not found Category for this id ${id}`,404));
    }
    res.status(204).send();
});