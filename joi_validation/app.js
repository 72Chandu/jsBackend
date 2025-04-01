const express=require('express');
const app=express();
const{userModel ,validateModels}=require("./models/user-model");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res,next){
    res.send("chal raha hai")
});

// app.post("/create",async function(req,res,next){
//    let user=await userModel.create({ //schema ka ek v key value user se milega to it accept that key-value pair and send to backend
//         name:req.body.name, // we dont want to left any key-value pair unfiled by user so we need joi
//     });
//     res.send(user);
// });

app.post("/create",async function(req,res,next){
    let {username,name,age,email,contect}=req.body;
    let error=validateModels({username,name,age,email,contect});//checking through joi
    if(error) res.status(500).send(error.message);
    else res.send("everything is fine");
 });
app.listen(3000);