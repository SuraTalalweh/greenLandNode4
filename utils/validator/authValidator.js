const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const {slugify } = require('slugify');
const User = require('../../models/userModel.js');
// validator for routes category

exports.signupValidator=[
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

    validatorMiddleware,
];


exports.loginValidator=[
    check('email').notEmpty().withMessage('email required').isEmail()
    .withMessage('Invalid email'),
    check('password').notEmpty()
    .withMessage('password required').isLength({min:6}).withMessage('password must be 6 characters'),
    validatorMiddleware,
];




