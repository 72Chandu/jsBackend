const jwt=require("jsonwebtoken");
const generatetoken=(data)=>{
    console.log(process.env.JWT_SECRET);
    return jwt.sign(data ,process.env.JWT_SECRET);
}
module.exports=generatetoken;