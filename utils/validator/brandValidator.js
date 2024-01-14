const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')
// validator for routes category
exports.getBrandValidator=[
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validatorMiddleware,
];
exports.createBrandValidator=[
    check('name').notEmpty().withMessage('Brand required')
    .isLength({min:3}).withMessage('short Brand name').isLength({max:32})
    .withMessage('long Brand name'),
    validatorMiddleware,
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validatorMiddleware,
];

exports.deleteBrandValidator=[
    check('id').isMongoId().withMessage('Invalid Brand id'),
    validatorMiddleware,
];


