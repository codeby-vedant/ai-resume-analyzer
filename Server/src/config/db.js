require('dotenv').config();
const mongoose = require("mongoose");
const connectDB=async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URI,{
     });
     console.log("MongoDB connection Successfull");
     
    }catch(err){
        console.log("MongoDB connection error",err);
        process.exit(1);
    }
    process.on('SIGINT',async ()=>{
        await mongoose.connection.close();
        console.log("MONGODB connection closed succesfully");
        process.exit(0);
        
    })
}
module.exports=connectDB;

