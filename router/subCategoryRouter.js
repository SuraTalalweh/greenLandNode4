const express=require('express');
const {createSubCategory,getSubCategories,getSpecificSubCategory,updateSubCategory,deletesubCategory,setCategoryIdToBody,createFilterObj}=require('../controller/subCategoryController.js');
// const { createSubCategoryValidator } = require('../utils/validator/subCategoryValidator.js');
const {createSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator}=require('../utils/validator/SubCategoryValidator.js')
// mergeParams بتخليني افوت على راوت  تاني 
// megePrama allow us to access parameters on onther routers.
const router =express.Router({mergeParams:true});

router.route('/').post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory).get(createFilterObj,getSubCategories);
router.route('/:id').get(getSubCategoryValidator,getSpecificSubCategory).put(updateSubCategoryValidator,updateSubCategory).delete(deleteSubCategoryValidator,deletesubCategory);


module.exports=router;