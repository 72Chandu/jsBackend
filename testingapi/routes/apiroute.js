const express=require("express");
const router=express.Router();
const userModel=require("../models/user");

router.get("/users",async function(req,res){
    let users=await userModel.find();
    res.json(users);
})

router.post("/users",async function(req,res){
    let users=await userModel.create({
        name:req.body.name,
        username:req.body.username
    });
    res.json(users);
})

router.put("/users/:id",async function(req,res){ //upadate
    let UpdatedUsers=await userModel.findOneAndUpdate(
        {
            _id:req.params.id,
        },
        {
            name:req.body.name,
        },
        { new:true }
   );
    res.json(UpdatedUsers);
})

router.delete("/users/:id",async function(req,res){ //upadate
    let deleteUsers=await userModel.findOneAndDelete({_id:req.params.id,});
    res.json(deleteUsers);
})
module.exports=router;