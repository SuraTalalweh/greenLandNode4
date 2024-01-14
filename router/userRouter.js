const express=require('express');
const {getUserValidator,cahngeUserPasswordValidator,createUserValidator, updateUserValidator, deleteUserValidator}=require('../utils/validator/userValidator.js');
const {getUsers,changeUserPassword, createUser, getSpecificUser, updateUser, deleteUser,resizeImage} =require('../controller/userController.js');
const router =express.Router();

// router.route('/').get(getUsers).post(
//     createUserValidator,
//     // resizeImage,
//     createUser);
// // rules
// router.route('/:id').get(
//     // getBrandValidator,
//      getSpecificUser).put(
//         // updateBrandValidator,
//         // resizeImage,
//         updateUser).delete(
//             // deleteBrandValidator,
//             deleteUser);

router.put('/changePassword/:id',cahngeUserPasswordValidator,changeUserPassword);
router.route('/').get(getUsers).post(
    createUserValidator,createUser);
// rules
router.route('/:id').get(
    // getBrandValidator,
     getSpecificUser).put(
        // updateBrandValidator,
        updateUser).delete(
            // deleteBrandValidator,
            deleteUser);
module.exports=router;