const express=require('express');
const {getBrandValidator,createBrandValidator, updateBrandValidator, deleteBrandValidator}=require('../utils/validator/brandValidator.js')
const {getBrands, createBrand, getSpecificBrand, updateBrand, deleteBrand} =require('../controller/brandController.js');
const router =express.Router();

router.route('/').get(getBrands).post(createBrandValidator,createBrand);
// rules
router.route('/:id').get(getBrandValidator, getSpecificBrand).put(updateBrandValidator,updateBrand).delete(deleteBrandValidator,deleteBrand);
module.exports=router;