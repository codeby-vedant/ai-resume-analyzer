const User = require("../models/user");
const profileController = async (req, res) => {
  try {
    const id =  req.user.id;
    const existingUser = await User.findById( id );
   
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({email:existingUser.email,name:existingUser.name});
  } catch (err) {
    console.log(err);
    return res.status(500).json({error:"Something went wrong try again"});
  }
};
module.exports=profileController;
