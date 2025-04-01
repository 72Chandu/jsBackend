const jwt=require("jsonwebtoken");
const userModel = require("../models/user-model");
module.exports.protect=async (req,res,next)=>{
    if(req.cookies.token){
        try{
            const data=jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            let user=await userModel.findOne({email:data.email}).select("-password"); //password save mat karo
            req.user=user;
            next();
        }catch(err){
            res.status(401).send("not authorized")
        }
    }
    if(!req.cookies.token){
        res.status(401).send("not authorized you need token")
    }
}