const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signupSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please provide a value"],
  },
  lastname: {
    type: String,
    required: [true, "please provide a value"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
  },
  profilepic:{
    type:String
  }
});
// PASSWORD HASH
signupSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// CREATE TOKEN
signupSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWI_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
// COMPARE PASSWORDS
signupSchema.methods.passCompare = async function (passCompared) {
  const samePass = await bcrypt.compare(passCompared, this.password);
  return samePass;
};

module.exports = mongoose.model("SignUp", signupSchema);
