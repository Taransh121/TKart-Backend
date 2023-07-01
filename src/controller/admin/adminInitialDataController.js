const Category = require("../../models/CategoryModel");
const Product = require("../../models/productModel");

function createCategories(categories, parentId = null) {
    let categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
        //Agar parentId null hai mtlb vo khud hee parent category hai toh uski parentId undefined hee hogi
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId);
        //Agar parentId null nahi hai toh jo parentId hai usko parentId ke equal krdo
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            parentId: cate.parentId,
            type:cate.type,
            children: createCategories(categories, cate._id)
        })
    }
    return (categoryList)
}

exports.initialData = async (req, res) => {
    const categories = await Category.find().exec();
    const products = await Product.find()
        .select(" _id name category price quantity description pictures")
        .populate({ path: "category", select: "_id name" })
        .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}