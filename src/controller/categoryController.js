const Category = require("../models/CategoryModel")

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

exports.addCategory = (req, res) => {
    Category.findOne({ name: req.body.name })
        .exec(async (error, category) => {
            if (error) {
                success = false;
                return res.status(400).json({ success, error: "Internal server error1" });
            }
            if (category) {
                success = false;
                return (res.status(400).json({ success, error: "Sorry a category with this name already exists" }))
            }

            const categoryObj = {
                name: req.body.name,
            }

            if (req.file) {
                categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;
            }

            if (req.body.parentId) {     //ParentId jese Electronics,Mobile and tv are its sub categories. If parentId present hai tohj usko prnt ID bana do.
                categoryObj.parentId = req.body.parentId
            }
            const newCategory = new Category(categoryObj);
            newCategory.save((error, categoryy) => {
                if (error) {
                    success = false;
                    return res.status(400).json({ success, error });
                }
                if (categoryy) {
                    success = true;
                    return (res.status(200).json({ category: categoryy }))
                }
            }
            )
        })
}

exports.getCategories = (req, res) => {
    // console.log(req.params);
    Category.find({})
        .exec((error, categories) => {
            if (error) {
                return (res.status(400).json({ error }))
            }
            if (categories) {
                let categoryList = createCategories(categories)      //Agar categories hongi toh vo upar createCategories naam ke function me jayengi.
                return res.status(200).json({ categoryList })
            }
        })
}

exports.updateCategories=async(req,res)=>{
    const {_id,name,parentId,type}=req.body;
    const updateCategories=[];
    if(name instanceof Array){
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                type:type[i],
            }
            if(parentId[i] !==""){
                category.parentId=parentId[i];
            }
            const updatedCategory=await Category.findOneAndUpdate({_id:_id[i]},category,{new:true})
            updateCategories.push(updatedCategory);
        }
        return res.status(201).json({updateCategories})
    }
    else{
        const category={name,type};
        if(parentId!==""){
            category.parentId=parentId; 
        }
        const updatedCategory=await Category.findOneAndUpdate({_id},category,{new:true})
        return res.status(201).json({updatedCategory})
        
    }
}

exports.deleteCategories=async(req,res)=>{
    const {ids}=req.body.payload;
    const deletedCategories=[];
    for(let i=0;i<ids.length;i++){
        const deleteCategory=await Category.findOneAndDelete({_id:ids[i]._id}) 
        deletedCategories.push(deleteCategory)
    }
    if(deletedCategories.length===ids.length){
        res.status(200).json({msg:"Categories Removed"})
    }
    else{
        res.status(400).json({msg:"Something went wrong"})
    }
}