const bcrypt=require("bcrypt");

function hashpassword(password){
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password,10,function(err,hashed){
            return hashed;
        })
    })
}
module.exports=hashpassword;