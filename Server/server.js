require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const tokenVerifier=require('./src/middleware/authorization');
const userRouter=require("./src/routes/userRoute");
const uploadRouter=require("./src/routes/upload");
const app = express();
connectDB();
app.use(express.json());
const authRouter = require("./src/routes/authRoute");
app.use("/api/auth", authRouter);
app.use("/api/users", tokenVerifier,userRouter);
app.use("/api/upload",tokenVerifier,uploadRouter);
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
