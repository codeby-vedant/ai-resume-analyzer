const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/dashboard");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "google login failed" });
  }
};
module.exports=googleLogin;
