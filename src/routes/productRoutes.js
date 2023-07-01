const express = require("express");
const { requireSignin, adminMiddleware, upload } = require("../middleware/middleware");
const { addProduct, getAllProducts, getProductDetailsById} = require("../controller/productController")
const router = express.Router();


router.post("/product/create", requireSignin, adminMiddleware, upload.array("pictures"), addProduct)
router.get("/product/:name",getAllProducts);
router.get("/products/:productId",getProductDetailsById);

module.exports = router;