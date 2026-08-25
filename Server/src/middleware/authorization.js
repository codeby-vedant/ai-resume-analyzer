require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenVerifier = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decodedToken.id };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = tokenVerifier;
