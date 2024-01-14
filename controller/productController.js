const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const ProductModel=require('../models/productModel.js');
const ApiError=require('../utils/apiError.js');
const ApiFeatures=require('../utils/apiFeatures.js');
const productModel = require('../models/productModel.js');

//send error for global by using next 
exports.getProducts=asyncHandler(async(req,res)=>{
    // filtering
    // const queryStringObj={...req.query};
    // const excludesFields=['page','sort','limit','fields'];
    // excludesFields.forEach((field)=> delete queryStringObj[field]);
    // let queryStr= JSON.stringify(queryStringObj);
    // queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);

    // pagination
//    const apiFeatures=new ApiFeatures()
//     const page=req.query.page*1 ||1;
//     const limit=req.query.limit*1 || 5;
//     const skip=(page-1)*limit;

const documentsCount= await productModel.countDocuments();
const apiFeatures= new ApiFeatures(productModel.find(),req.query).paginate(documentsCount).filter().search('Products').limitFields().sort();

const {mongooseQuery, paginationResult}=apiFeatures;
const products= await mongooseQuery;
   res.status(200).json({results:products.length,paginationResult,data:products});

// sorting
// if (req.query.sort){
//     const sortBy=req.query.sort.split(',').join(' ');
//     mongooseQuery=mongooseQuery.sort(sortBy);
// }else{
//     mongooseQuery=mongooseQuery.sort('-createdAt');
// }

// fields
// if(req.query.fields){
//     const fields= req.query.fields.split(',').join(' ');
//     mongooseQuery=mongooseQuery.select(fields);
// }else{
//     mongooseQuery=mongooseQuery.select('-_v');
// }

// search
// if(req.query.keyword){
//     const query= {};
//     query.$or=[
//         { title: {$regex: req.query.keyword, $options:'i'}},
//         { description: { $regex: req.query.keyword, $options:'i'}},
//         ];
//         mongooseQuery=mongooseQuery.find(query);
// }

});

exports.getSpecificProduct=asyncHandler(async (req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    const product=await ProductModel.findById(id)
    .populate({path:'category',select:'name'});;
    if(!product){
        return next(new ApiError(`Not found Product for this id ${id}`,404));
    }
    res.status(200).json({data:product});
});

exports.createProduct=asyncHandler(async(req,res)=>{
//   ممكن نعملها في الفاليديشن
    req.body.slug=slugify(req.body.title);
   const product=await ProductModel.create(req.body);
   res.status(201).json({data:product});
});
exports.updateProduct=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    // مش اجباري نعدل على العنوان
    if(req.body.title){
    req.body.slug=slugify(req.body.title);
}
    const product= await ProductModel.findOneAndUpdate(
        {_id:id},req.body,{new:true}
    );
    if(!product){
        return next(new ApiError(`Not found Product for this id ${id}`,404));
    }
    res.status(200).json({data:product});
});
exports.deleteProduct=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const product= await ProductModel.findByIdAndDelete(id);
    if(!product){
        return next(new ApiError(`Not found Product for this id ${id}`,404));
    }
    res.status(204).send();
});