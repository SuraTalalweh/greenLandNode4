const {check}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js')
// validator for routes category
exports.getCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware,
];
exports.createCategoryValidator=[
    check('name').notEmpty().withMessage('category required')
    .isLength({min:3}).withMessage('short category name').isLength({max:32})
    .withMessage('long category name'),
    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware,
];

exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware,
];


