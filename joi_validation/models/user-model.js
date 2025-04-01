const joi = require('joi');
const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/joitestdb");
const userSchema=mongoose.Schema({ // use phind ai for this
    username:{
        type:String,
        minLength:3,
        required:true
    },
    name:{
        type:String,
        minLength:3,
        required:true
    },
    age:{
        type:Number,
        min:18,
        required:true
    },
    email:{
        type:String,
    },
    contect:{
        type:Number,
        required:true
    },
});
function validateModels(data){
    let schema=joi.object({
        username:joi.string().min(3).required(),
        name:joi.string().min(3).required(),
        age:joi.number().min(18).required(),
        email:joi.string().email().required(),
        contect:joi.number().required(),
    })
    .message({
        'string.email':"make sure your email are correct"
    })
    let resolveAns=schema.validate(data);
    console.log(resolveAns.error?.message);//jo field nahi fill karega uska valid messang aayega one by one releted to filed which is not fill
    return resolveAns;
}
let userModel=mongoose.model("user",userSchema);
module.exports={userModel, validateModels};
//frontend (check schema) --->server-->check schema with help of joi in route---->checking at mongodb is all validator is sucess-->then it store at mongodb  
