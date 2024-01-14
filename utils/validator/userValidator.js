const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const { slugify } = require('slugify');
const User = require('../../models/userModel.js');
const bcrypt=require('bcryptjs');
// validator for routes category
exports.getUserValidator=[
    check('id').isMongoId().withMessage('Invalid User id'),
    validatorMiddleware,
];
exports.createUserValidator=[
    check('name').notEmpty().withMessage('User required')
    .isLength({min:3}).withMessage('short User name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    check('email').notEmpty().withMessage('email required').isEmail()
    .withMessage('Invalid email')
    .custom((val)=>User.findOne({email:val}).then((user)=>{
        if (user) {
            return Promise.reject(new Error('email already exist'))
        }
    })),
    check('password').notEmpty()
    .withMessage('password required').isLength({min:6}).withMessage('password must be 6 characters')
    .custom((password, {req})=>{
        if(password !=req.body.passwordConfirm){
            throw new Error("Password and confirm password not match");
        }
        return true;
    }),
    check('passwordConfirm').notEmpty()
    .withMessage('password confirm required'),
    check('profileImg').optional(),
    check('role').optional(),

    validatorMiddleware,
];
exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id'),
    check('name').notEmpty().withMessage('User required')
    .isLength({min:3}).withMessage('short User name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    check('email').notEmpty().withMessage('email required').isEmail()
    .withMessage('Invalid email')
    .custom((val)=>User.findOne({email:val}).then((user)=>{
        if (user) {
            return Promise.reject(new Error('email already exist'))
        }
    })),
    check('profileImg').optional(),
    check('role').optional(),
    
    validatorMiddleware,
];

exports.cahngeUserPasswordValidator=[
    check('id').isMongoId().withMessage('Invalid User id format'),
    check('currentPassword').notEmpty().withMessage('you must enter your current password'),
    check('passwordConfirm').notEmpty().withMessage('you must enter password confirm'),
    check('password').notEmpty().withMessage('You must provide a new password')
    .custom(async(val,{req})=>{
        const user=await User.findById(req.params.id);
        if(!user){
            throw new Error('There is no user for this id');
        }
        const isCorrectPassword=await bcrypt.compare(
            req.body.currentPassword,
            user.password
        );
        if (!isCorrectPassword) {
            throw new Error('Current Password is incorrect');
        }
        if(val != req.body.passwordConfirm){
            throw new Error ('password confirm inncorrect ');
        }
        return true;
    }),
    validatorMiddleware,
];

exports.deleteUserValidator=[
    check('id').isMongoId().withMessage('Invalid User id'),
    validatorMiddleware,
];


