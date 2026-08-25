const express = require("express");
const googleLogin = require("../controllers/googleLogin");
const googleRouter = express.Router();
const callbackRouter = express.Router();
const passport = require("passport");
// starts google authentication
googleRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
//callBack
callbackRouter.get(
  "/google/auth",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleLogin,
);
module.exports = { googleRouter, callbackRouter };
