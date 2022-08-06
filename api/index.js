const express=require("express")
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const multer= require("multer")
const path= require("path");


const app=express();
const PORT=5000;

app.use("/images",express.static(path.join(__dirname+"/images")))

app.use(express.json())
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(console.log("Connected to mongoDB"))
.catch((err)=>{console.log(err)})

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename(req,file,cb){
        cb(null,req.body.name);
    },
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single('file'),(req,res)=>{
    res.status(200).json("File uploaded")
})


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.use("/",(req,res)=>{
    res.send("Welcome");
})

app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
});