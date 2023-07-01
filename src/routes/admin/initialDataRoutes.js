const express=require("express");
const { initialData } = require("../../controller/admin/adminInitialDataController");
// const { signup, signin, signout} = require("../../controller/admin/adminAuthController");
// const { requireSignin } = require("../../middleware/middleware");
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/authValidators");
const router=express.Router();

router.post("/initialdata",initialData)


module.exports=router;