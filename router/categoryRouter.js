const express=require('express');
const {getCategoryValidator,createCategoryValidator, updateCategoryValidator, deleteCategoryValidator}=require('../utils/validator/categoryValidator.js')
const {getCategories, createCategory, getSpecificCategory, updateCategory, deleteCategory} =require('../controller/categoryController.js');
const subCategoryRouter=require('./subCategoryRouter.js');
const authController=require('../controller/authController.js')
const router =express.Router();
// nested route
router.use('/:categoryId/subcategories',subCategoryRouter)
router.route('/').get(getCategories).post(
    // authController.protect,
    createCategoryValidator,createCategory);
// rules
router.route('/:id').get(getCategoryValidator, getSpecificCategory).put(updateCategoryValidator,updateCategory).delete(deleteCategoryValidator,deleteCategory);
module.exports=router;