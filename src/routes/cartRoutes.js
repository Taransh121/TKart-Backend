const express = require("express");
const { requireSignin, userMiddleware } = require("../middleware/middleware");
const {addItemToCart,getCartItems}=require("../controller/cartController")
const router = express.Router();

router.post("/cart/addtocart",requireSignin,userMiddleware,addItemToCart);
router.post("/cart/getCartItems",requireSignin,userMiddleware,getCartItems);


module.exports = router;