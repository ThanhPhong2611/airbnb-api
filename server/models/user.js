const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  imageSrc : {
    type: String,
  },
  password: {
    type: String,
  },
});
// Tao pass ngau nhien truoc khi luu
userSchema.pre("save",async function (next){
  if(!this.isModified("password")){
      next();
  };
  this.password = await bcrypt.hash(this.password,10);
});

// Token
userSchema.methods.getJWTToken = function(){
  return jwt.sign({ _id : this._id, name : this.name},process.env.JWT_SECRET,{
      expiresIn : process.env.JWT_EXPIRE
  });
}

// Doi chieu mat khau
userSchema.methods.comparePassword = async function(enterPassword){
  var match = await bcrypt.compare(enterPassword,this.password);
  if(match){
      return match;
  }else{
      match = false;
      return match;
  }
}
// Quen mat khau va tao moi ma token
userSchema.methods.getResetPasswordToken = async function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
  console.log(resetToken)
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 24 * 60 * 60 * 1000;
  return resetToken;
}

module.exports = mongoose.model("User", userSchema);
