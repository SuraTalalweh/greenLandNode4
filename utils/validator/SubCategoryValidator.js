const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')
// validator for routes Subcategory
exports.getSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid Subcategory id'),
    validatorMiddleware,
];
exports.createSubCategoryValidator=[
    check('name').notEmpty().withMessage('Subcategory required')
    .isLength({min:2}).withMessage('short Subcategory name').isLength({max:32})
    .withMessage('long Subcategory name'),
    check('category')
    .notEmpty().withMessage('subCategory must belong to category')
    .isMongoId().withMessage('Invalid category id'),
    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id'),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid Subcategory id'),
    validatorMiddleware,
];

