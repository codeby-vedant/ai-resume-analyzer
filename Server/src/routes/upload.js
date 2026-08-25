const express=require('express');
const uploadRouter=express.Router();
const {upload}=require('../utils/upload');
const uploadAndExtract=require('../controllers/uploadAndExtract');
uploadRouter.post("/resume",upload.single("resume"),uploadAndExtract);
module.exports=uploadRouter;
