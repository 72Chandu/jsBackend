const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/testingadvancecommand");
const userSchema=mongoose.Schema({
    username:String,
    name:String,
    password:String,
    age:String,
    isMarried:Boolean,
    email:String,
    isadmin:Boolean

})
module.exports=mongoose.model('user',userSchema);