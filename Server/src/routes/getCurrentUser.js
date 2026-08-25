const express=require('express');
const User=require("../models/user");
const tokenVerifier = require('../middleware/authorization');
const getCurrentUser=express.Router();
getCurrentUser.get('/me',tokenVerifier,async(req,res)=>{
    try{
    const user=await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
    }catch(err){
        console.log(err);//debug
        return res.status(500).json({error:"Internal Server error"});
        
    }
});
module.exports=getCurrentUser;