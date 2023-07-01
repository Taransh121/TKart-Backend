const express=require("express");
const router=express.Router();
const { requireSignin, userMiddleware } = require("../middleware/middleware");
const { addAddress, getAddress } = require("../controller/addressController");

router.post("/address/create",requireSignin,userMiddleware,addAddress);
router.post("/address/getaddress",requireSignin,userMiddleware,getAddress);

module.exports=router;
