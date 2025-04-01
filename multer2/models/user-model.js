const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/multermemorydb");
const userSchema=mongoose.Schema({
    name:String,
    image:Buffer,
});
module.exports=mongoose.model("user",userSchema);