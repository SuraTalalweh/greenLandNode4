const asyncHandler=require('express-async-handler') 
const ApiError=require('../utils/apiError.js');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const userModel=require('../models/userModel.js');

exports.signup=asyncHandler(async (req,res,next)=>{
    const user= userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRE_TIME,
    });
    res.status(201).json({data:user,token});
});

exports.login=asyncHandler(async (req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email});

    if(!user || !(await bcrypt.compare(req.body.password,user.password))){
        return next(new ApiError("Incorrect email or password",410));
    }
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRE_TIME,
    });
    res.status(200).json({data:user, token})

})

exports.protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split('')[1];
    }   
    if(!token) {
        return next(new ApiError('You are not logged in! Please login to get access',401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new ApiError(
          'The user that belong to this token does no longer exist',
          401
        )
      );
    }
    req.user = currentUser;
    next();
});
