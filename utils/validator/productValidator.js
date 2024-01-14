const {check, Result}=require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const CategoryModel = require('../../models/categoryModel.js');
const subCategoryModel=require('../../models/subCategoryModel.js')

exports.createProductValidator=[
    check('title').isLength({min:3}).withMessage('must be at leaste 3 character').notEmpty().withMessage('product required'),
    check('description').notEmpty().withMessage('product description required').isLength({max:2000}).withMessage('long description'),
    check('quantity').notEmpty().withMessage('product quantity is required').isNumeric().withMessage('product quantity must be number'),
    check('sold').optional().isNumeric().withMessage('product quantity must be number'),
    check('price').notEmpty().withMessage('product price is required').isNumeric().withMessage('Product price must be number').isLength({max:32}).withMessage('long price'),
    check('priceAfterDiscount').optional().toFloat().isNumeric().withMessage('product priceAfterDiscount must be number')
    .custom((value,{req})=>{
        // نتاكد من السعر الي جبته الاساسي والسعر بعد الخصم (لازم اقل من بعد الخصم)
        if(req.body.price<=value){
            throw new Error("priceAfterDiscount must be lower than price");
        }
        return true;
    }),
    check('colors').optional().isArray().withMessage('colors should be array'),
    check('imageCover').notEmpty().withMessage('Product imageCover is required'),
    check('images').optional().isArray().withMessage('images should be array of String'),
    check('category').notEmpty().withMessage('product must be belong to a category').isMongoId().withMessage('Invalid Id format')
    .custom((categoryId)=>CategoryModel.findById(categoryId).then((category)=>{
        if(!category){
            return Promise.reject(
                new Error(`No category for this is :${categoryId}`)
            );
        }
    })),
    check('subcategories').optional().isMongoId().withMessage('Invalid id formate')
    .custom((subcategoriesIds)=>subCategoryModel.find({_id:{$exists:true, $in:subcategoriesIds}}).then(
        (result)=>{
            if(result.length<1 || result.length != subcategoriesIds.length){
                return Promise.reject(new Error(`Invalid subcategories Ids`));
            }
        }
    )).custom((val,{req})=>
    subCategoryModel.find({category:req.body.category}).then(
        (subcategories)=>{
            const subcategoriesIdsDB=[];
            subcategories.forEach((subCategoryModel)=>{
                subcategoriesIdsDB.push(subCategoryModel._id.toString());
            });
            // check if subCategory ids in db include subcategory
            if(!val.every((v)=>subcategoriesIdsDB.includes(v))){
                return Promise.reject(new Error(' Subcategories not belong to the main category'));
            }
        }
    )),
    check('brand').optional().isMongoId().withMessage('Invalid id formate'),
    check('ratingAverage').optional().isNumeric().withMessage('rating must be a number').isLength({min:1}).withMessage('rating must be above or equal 5').isLength({max:5}).withMessage('rating must be below or equal 5'),
    check('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),
    validatorMiddleware,
];
 exports.getProductValidator=[
    check('id').isMongoId().withMessage('Invalid Id formate'),
    validatorMiddleware,
 ];

 exports.updateProductValidator=[
    check('id').isMongoId().withMessage('Invalid Id formate'),
    validatorMiddleware,
 ];

 exports.deleteProductValidator=[
    check('id').isMongoId().withMessage('Invalid Id formate'),
    validatorMiddleware,
 ];