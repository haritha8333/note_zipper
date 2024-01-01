const express= require('express');
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router=express.Router()
//this route is basically an api end point so '/'
//we are storing data in backend so we use post
//inside post(...) we will have a controller
router.route('/').post(registerUser)
router.route("/login").post(authUser);
router.route('/profile').post(protect,updateUserProfile)
//keeping protect so that only authorised can update
module.exports=router;