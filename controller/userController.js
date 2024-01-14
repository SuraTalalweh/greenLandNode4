const slugify=require('slugify');
const asyncHandler=require('express-async-handler');
const userModel=require('../models/userModel.js');
const ApiError=require('../utils/apiError.js');
const bcrypt=require('bcryptjs');
// const sharp=require('sharp');
const ApiFeatures=require('../utils/apiFeatures.js');
// const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
// const { v4: uuidv4 } = require('uuid');


// exports.uploadUserImage = uploadSingleImage('profileImg');
// exports.resizeImage = asyncHandler(async (req, res, next) => {
//     const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  
//     if (req.file) {
//       await sharp(req.file.buffer)
//         .resize(600, 600)
//         .toFormat('jpeg')
//         .jpeg({ quality: 95 })
//         .toFile(`uploads/users/${filename}`);
  
//       // Save image into our db
//       req.body.profileImg = filename;
//     }
  
//     next();
//   });

//send error for global by using next 
exports.getUsers=asyncHandler(async(req,res)=>{
    const documentsCount= await userModel.countDocuments();
    const apiFeatures= new ApiFeatures(userModel.find(),req.query).paginate(documentsCount)
    .filter().search().limitFields().sort();

    const {mongooseQuery, paginationResult}=apiFeatures;
    const users= await mongooseQuery;
    
   res.status(200).json({results:users.length,paginationResult,data:brands});
//    res.send();
});

exports.getSpecificUser=asyncHandler(async (req,res,next)=>{
    // const id=req.params.id;
    const {id}=req.params;
    const user=await userModel.findById(id);
    if(!user){
        return next(new ApiError(`Not found user for this id ${id}`,404));
    }
    res.status(200).json({data:user});
});

exports.createUser=asyncHandler(async(req,res)=>{
// //    const {datas}=req.body;
// // const {name}=req.body;

//    const user=await userModel.create(req.body
//     // ,slug:slugify(name)
// );

// // const user = await userModel.create(datas);
//     res.status(201).json({ data: user });

const user = await Model.create(req.body);
    res.status(201).json({ data: user });
});
exports.updateUser=asyncHandler(async (req,res,next)=>{
    const document= await userModel.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            email:req.body.email,
            // slug:req.body.slug,
            phone:req.body.phone,
            email:req.body.email,
            profileImg:req.body.profileImg,
            role:req.body.role,
        },{new:true}
    );
    if(!document){
        return next(new ApiError(`No document for this id ${req.params.id}`,404))
    }
    res.status(200).json({data:document});
});

exports.changeUserPassword=asyncHandler(async (req,res,next)=>{
    const document= await userModel.findByIdAndUpdate(
        req.params.id,{
           password: await bcrypt.hash(req.body.password,12),
        },{new:true}
    );
    if(!document){
        return next(new ApiError(`No document for this id ${req.params.id}`,404))
    }
    res.status(200).json({data:document});
});
exports.deleteUser=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const user= await userModel.findByIdAndDelete(id);
    if(!user){
        return next(new ApiError(`Not found user for this id ${id}`,404));
    }
    res.status(204).send();
});