const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const SuccessHandler = require('../utils/successHandler');
exports.register = async function(req,res,next){
    const {name,email,password} = req.body;
    const noAvatar = 'https://res.cloudinary.com/dxjjchejg/image/upload/v1686998373/bvkcyay8vuljef1zdlgm.png';
    const user = await User.create({
        name,email,password,
        imageSrc : noAvatar
    });
    res.status(200).send({
        user
    })
};

exports.login = async function (req,res,next) {
    const { email, password } = req.body;

    if (!email || !password) {
        ErrorHandler(res,400,"Please enter your email and password");
        return;
    };
    
    const user = await User.findOne({
        email     
    }).select("+password");
    if (!user){
        ErrorHandler(res,400,"Email or password not found");
        return;
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(isPasswordMatched === false){
        ErrorHandler(res,401,"Incorrect email with userName");
        return;
    }
    sendToken(user, 200, res);
};
exports.logout = async function (req,res,next) {
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true
    });

    res.status(200).json({
        success: true,
        message : "User logged out",
    });
};
// Cap nhat thong tin tai khoan
exports.updateInfo = async function (req,res,next) {
    var newUserData = {
        name : req.body.name,
        imageSrc : req.body.imageSrc
    };
    const user = await User.findByIdAndUpdate(req.body.id,newUserData,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    });
    res.status(200).json({
        success: true,
        user
    });
};

exports.getUser = async function (req,res,next) {
    const user = await User.findOne({ _id : req.params.id});
    
    res.status(200).json({
        success: true,
        user
    });
};