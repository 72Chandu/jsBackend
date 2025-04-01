//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const express=require("express");
const app=express();
const userModel=require("./models/user-model");
const upload =require("./multer-setup.js");
app.set("view engine","ejs")
app.get("/",function(req,res){
    res.render("index");
});

app.post("/upload", upload.single('image'), async function (req, res) {
    // req.file is the `image` file
    console.log(req.file);//image kasara property aa jayega
    let user=await userModel.create({//databse me daal rahe hai
        name:"bag",
        image:req.file.filename,
    });
    res.send(user);
    // req.body will hold the text fields, if there were any
})
app.listen(3000);