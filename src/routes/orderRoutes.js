const express=require("express");
const { addOrder, getOrders, updateOrder } = require("../controller/orderController");
const router=express.Router();
const { requireSignin, userMiddleware, adminMiddleware } = require("../middleware/middleware");

router.post("/order/addOrder",requireSignin,userMiddleware,addOrder);
router.get("/order/getOrders",requireSignin,userMiddleware,getOrders);
router.post("/order/update",requireSignin,adminMiddleware,updateOrder);

module.exports=router;