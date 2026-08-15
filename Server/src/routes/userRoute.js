const express=require('express');
const profileController=require('../controllers/profileController');
 const userRouter=express.Router();
 userRouter.get("/profile",profileController)
 module.exports=userRouter;