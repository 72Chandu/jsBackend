const express=require("express");
const app=express();
const userModel=require("./models/user-model");
const upload =require("./multer-setup.js");
const sharp=require("sharp"); // used to reduce the file size before uploading in a multer setup
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("index");
});

app.post("/upload", upload.single('image'), async function (req, res) {
    console.log(req.file);//image kasara property aa jayega
    
    if(!req.file) return res.send("file not found");
    let newbuffer=req.file.buffer;
    if(req.file.size>10*1024*1024){
        newbuffer=await sharp(req.file.buffer).resize({width:1920}).toBuffer(); //image ka size small kardega and upload it 
    }

    console.log(`purana size ${req.file.size}`)
    console.log(`naya size ${buffer.byteLength(newbuffer)/1024}`)

    let user=await userModel.create({//databse me daal rahe hai
        name:"another bag",
        image:newbuffer, //image me buffer data store hoga.
    });

    res.send("image is uploaded");
});//jitna image tum upload karega utna hi image tumhe show pe milega 

app.get("/show", async function(req,res){
    let files=await userModel.find(); 
    res.render("show",{files});//show page per files send kar rahe hai
})
app.listen(3000);