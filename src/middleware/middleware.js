const jwt=require("jsonwebtoken");
const multer = require('multer');
const shortid = require("shortid");
const path = require("path");

exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,process.env.jwtSecret);
        req.user=user;
    }
    else{
        return res.status(400).json({msg:"Authorization required"})
    }
    next();
} 

exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return (res.status(400).json({msg:"Admin Access Denied"}))
    }
    next();
}

exports.userMiddleware=(req,res,next)=>{
    if(req.user.role!=="user"){
        return (res.status(400).json({msg:"User Access Denied."}))
    }
    next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/uploads"))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + "-" + file.originalname)
  }
})

exports.upload = multer({ storage })