const UserModel=require("../models/user-model");
const bcrypt=require("bcrypt");
const generatetoken=require("../utils/generatetoken")
module.exports.registerUser=async (req,res)=>{
    const{name,email,password}=req.body;
    try{
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send("your account already exists, please login");
        }
        let salt=await bcrypt.genSalt(10);
        let hash=await bcrypt.hash(password,salt);
        user=await UserModel.create({
            name,
            email,
            password:hash,
            
        });
        let token=generatetoken({email});
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000,
            secure:true,
        })
        res.status(201).send(user);
    }catch(err){
        res.status(500).send(err.message);
    }
};
module.exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(500).send("email or password incorrect");
        }
        let result=await bcrypt.compare(password,user.password);
        if(result){
            let token=generatetoken({email});
            res.cookie("token",token,{
                httpOnly:true,
                maxAge:30*24*60*60*1000,
                secure:true,
            })
            res.status(201).send("logged in sucessfully");
        }else{
            return res.status(500).send("email or password incorrect");
        }
    }catch(err){
        res.status(500).send(err.message);
    }
};
module.exports.logoutUser=function(req,res){
    res.cookie("token","",{
        httpOnly:true,
        secure:true,
    })
    res.status(201).send("looged out successfully");
};
module.exports.getUserProfile=function(req,res){
    console.log(req.user)
    res.send("loggedin ho aap");
};
//jwwt@gmail.com wdsewwe
