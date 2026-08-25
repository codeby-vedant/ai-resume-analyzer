const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    location: {
      type: String,
      Default: null,
      trim: true,
    },
    Role: {
      type: String,
      Default: "User",
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profilePhoto: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    resetPasswordToken: { type: String }, // hashed token
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userSchema);
module.exports = User;
