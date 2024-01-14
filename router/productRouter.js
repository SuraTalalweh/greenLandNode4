const express=require('express');
const {createProductValidator,getProductValidator, updateProductValidator, deleteProductValidator}=require('../utils/validator/productValidator.js')
const {getProducts, getSpecificProduct, createProduct, updateProduct, deleteProduct} =require('../controller/productController.js');

const router =express.Router();
router.route('/').get(getProducts).post(createProductValidator,createProduct);
// rules
router.route('/:id').get(getProductValidator, getSpecificProduct).put(updateProductValidator,updateProduct).delete(deleteProductValidator,deleteProduct);
module.exports=router;