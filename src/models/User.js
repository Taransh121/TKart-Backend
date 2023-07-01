const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

//USer Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,  //Removes the whitespaces
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,  //Removes the whitespaces
        min:3,
        max:20
    },
    userName:{
        type:String,
        required:true,
        trim:true,  //Removes the whitespaces
        unique:true,
        lowercase:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,  //Removes the whitespaces
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String
    }
},{timestamps:true})


module.exports=mongoose.model("User",userSchema)