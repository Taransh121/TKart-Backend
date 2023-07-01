const express = require("express");
const env = require("dotenv")
const app = express();
const mongoose = require("mongoose");
const path=require("path")
const cors=require("cors")

//ROUTES - 
const authRoutes=require("./routes/authRoutes")
const adminAuthRoutes=require("./routes/admin/adminAuthRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const productRoutes=require("./routes/productRoutes")
const cartRoutes=require("./routes/cartRoutes")
const initialDataRoutes=require("./routes/admin/initialDataRoutes")
const adminPageRoutes=require("./routes/admin/adminPage")
const addressRoutes=require("./routes/addressRoutes")
const orderRoutes=require("./routes/orderRoutes")


//ENVIRONMENT VARIABLE OR CONSTANTS -
env.config({ path: "../.env" });

// mongodb+srv://Taransh:<password>@cluster0.eq8d4zf.mongodb.net/?retryWrites=true&w=majority

//MONGODB CONNECTION
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://${process.env.Mongo_DB_User}:${process.env.Mongo_DB_Password}@cluster0.eq8d4zf.mongodb.net/${process.env.Mongo_DB_Database}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((error)=> {
    console.log(error);
});


//MiddleWare to pass the data to the POST API REQUESTS - 
app.use(cors());
app.use(express.json());
app.use("/public",express.static(path.join(__dirname,"uploads")));
app.use("/api",authRoutes);  //Now every API in userRoutes will be prefixed by '/api'. 
app.use("/api",adminAuthRoutes);   
app.use("/api",categoryRoutes);   
app.use("/api",productRoutes);   
app.use("/api",cartRoutes);   
app.use("/api",initialDataRoutes);   
app.use("/api",adminPageRoutes);   
app.use("/api",addressRoutes);   
app.use("/api",orderRoutes);   


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})