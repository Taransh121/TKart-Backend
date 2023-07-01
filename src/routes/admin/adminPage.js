const express=require("express");
const { createPage, getPage } = require("../../controller/admin/adminPage");
const router=express.Router();
const {upload, requireSignin, adminMiddleware } = require("../../middleware/middleware");


router.post("/page/create",requireSignin,adminMiddleware,upload.fields([
    {name:"banners"},
    {name:"products"},
]),createPage)

router.get("/page/:category/:type",getPage)

module.exports=router;