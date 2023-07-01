const Product = require("../models/productModel");
const Category = require("../models/CategoryModel")


exports.addProduct = ((req, res) => {
    // console.log(req);
    Product.findOne({ name: req.body.name })
        .exec(async (error, product) => {
            if (error) {
                success = false;
                return res.status(400).json({ success, error: "Internal server error1" });
            }
            if (product) {
                success = false;
                return (res.status(400).json({ success, error: "Sorry a product with this name already exists" }))
            }
            const { name, price, description, quantity, category, createdBy } = req.body;
            let pictures = [];
            if (req.files.length > 0) {
                pictures = req.files.map(file => {
                    return { img: file.filename }
                })
            }
            const newProduct = new Product({ name, price, description, pictures, quantity, category, createdBy: req.user._id })
            newProduct.save(((error, newProduct) => {
                if (error) {
                    success = false;
                    return res.status(400).json({ success, error });
                }
                if (newProduct) {
                    return res.status(200).json({ newProduct })
                }
            }))
        })
})

exports.getAllProducts = (req, res) => {
    const { name } = req.params;
    Category.findOne({ name: name }).select("_id type").exec((error, category) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (category) {
            Product.find({ category: category._id })
                .exec((error, products) => {
                    if (error) {
                        return res.status(400).json({ error })
                    }
                    if (category.type) {
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under10K: products.filter(product => product.price <= 10000),
                                    under20K: products.filter(product => product.price > 10000 && product.price <= 20000),
                                    under30K: products.filter(product => product.price > 20000 && product.price <= 30000),
                                    under40K: products.filter(product => product.price > 30000 && product.price <= 40000),
                                    under50K: products.filter(product => product.price > 40000 && product.price <= 50000),
                                }
                            })
                        }
                    }
                    else{
                        res.status(200).json({products})
                    }
                })
        }
    })
    // res.status(200).json({name}) 
}

exports.getProductDetailsById = (req, res) => {
    // console.log(req.params);
    // console.log("asd");
    const { productId } = req.params;  //Maybe Params contains only name not id.
    if (productId) {
        Product.findOne({ _id: productId })
            .exec((error, product) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (product) {
                    return res.status(200).json({ product })
                }
            })
    }
    else {
        return res.status(400).json({ error: "Params required" })
    }
}
