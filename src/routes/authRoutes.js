const express=require("express");
const router=express.Router();
const { signup, signin,signout} = require("../controller/authController");
const { validateSigninRequest,validateSignupRequest,isRequestValidated } = require("../validators/authValidators");

router.post("/signin",validateSigninRequest,isRequestValidated,signin)

router.post("/signup",validateSignupRequest,isRequestValidated,signup)
router.post("/signout",signout)



module.exports=router;