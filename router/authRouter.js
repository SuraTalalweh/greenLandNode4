const express=require('express');
const {signup,login}=require('../controller/authController.js');
const {signupValidator,loginValidator}=require('../utils/validator/authValidator.js');
var router = express.Router();

router.route('/signup').post(signupValidator,signup);
router.route('/login').post(loginValidator,login);

module.exports=router;