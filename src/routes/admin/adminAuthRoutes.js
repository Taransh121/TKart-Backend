const express=require("express");
const { signup, signin, signout} = require("../../controller/admin/adminAuthController");
const { requireSignin } = require("../../middleware/middleware");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/authValidators");
const router=express.Router();

router.post("/admin/signin",validateSigninRequest,isRequestValidated,signin)

router.post("/admin/signup",validateSignupRequest,isRequestValidated,signup)
router.post("/admin/signout",signout)


module.exports=router;