const express=require("express");
const router=express.Router();

const userModel=require("../models/user");

router.post("/create",async function(req,res){
    const user=await userModel.create({
        name:req.body.name,
        username:req.body.username,
    });
    res.send("user created successfully.");
});

module.exports=router;