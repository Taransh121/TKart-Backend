const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:25
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true
    },
    pinCode:{
        type:String,
        required:true,
        trim:true
    },
    locality:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:50
    },
    address:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:100
    },
    cityDistriction:{
        type:String,
        required:true,
        trim:true,
    },
    state:{
        type:String,
        required:true,
    },
    landmark:{
        type:String,
        min:5,
        mx:50
    },
    alternatePhone:{
        type:String
    },
    addressType:{
        type:String,
        required:true,
        enum:["home","work"]
    },
});

const userAddressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        required:true
    },
    address:[addressSchema]
},{timestamps:true});

module.exports=mongoose.model("UserAddress",userAddressSchema);


// sample address
// {
//     "payload":{
//       "address":{
//         "name":"Taransh Chellani",
//         "mobileNumber":"9118859567",
//         "pinCode":"208006",
//         "locality":"U block, Govind Nagar",
//         "address":"125/20, U block, Govind Nagar, Kanpur",
//         "cityDistriction":"Kanpur",
//         "landmark":"Chacha Nehru School",
//         "alternatePhone":"8707515036",
//         "addressType":"home"
//       }
//     }
//   }
