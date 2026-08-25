const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered Successfully", name, email });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong error msg" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "Email doesn't exist" });
    }
    if(!existingUser.password){
      return res.status(401).json({msg:"This is a google account login.Please login through google"});
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email or password is mismatched" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      msg: "User logged in successfully",
      token,
      user: { name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong try again" });
  }
};
module.exports = { registerUser, loginUser };
