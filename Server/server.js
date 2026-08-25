require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const tokenVerifier = require("./src/middleware/authorization");
const userRouter = require("./src/routes/userRoute");
const uploadRouter = require("./src/routes/upload");
const renderAnalyze = require("./src/routes/renderAnalyze");
const renderDashboard = require("./src/routes/renderDashboard");
const getCurrentUser = require("./src/routes/getCurrentUser");
const logoutHandler = require("./src/routes/logout");
const {googleRouter,callbackRouter} =require('./src/routes/googleAuth')
const { emailer } = require("./src/routes/resetPassword");
const matcher = require("./src/routes/jobMatching");
const updater = require("./src/controllers/profileUpdate");
const analysisGetter = require("./src/routes/getAnalysis");
const tipGenerator = require("./src/controllers/tipResume");
const passport = require("passport");
require("./src/config/googleStrategy");
const AIrouter = require("./src/controllers/analyzeResume");

const app = express();
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173", //“Allow my React app at http://localhost:5173 to talk to this Express server, and let it send cookies (JWT) along with requests.”
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
const authRouter = require("./src/routes/authRoute");







app.use("/api/auth", authRouter);
app.use("/api",googleRouter);
app.use("/api",callbackRouter);
app.use("/api/users", tokenVerifier, userRouter);
app.use("/api/upload", tokenVerifier, uploadRouter);
app.use("/api/analyze", tokenVerifier, AIrouter);
app.use("/api/analysisPage", tokenVerifier, renderAnalyze);
app.use("/api/dashboard", tokenVerifier, renderDashboard);
app.use("/api/info",getCurrentUser);
app.use("/api",logoutHandler);
app.use("/api/reset",emailer);
app.use("/api/compare",tokenVerifier,matcher);
app.use("/api/profile",tokenVerifier,updater);
app.use("/api/getAnalysis",tokenVerifier,analysisGetter);
app.use("/api/today",tokenVerifier,tipGenerator);


const port = process.env.PORT || 9000;
app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running at ${port}`);
});
