const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/joitestdbrefrence");
const userSchema=mongoose.Schema({
    name: String,
    age:Number,
    email:String,
    password:String,
    createdAt:{type:Date, default:Date.now},
    tags:[String], //array ex: tags:[js,css]
});
const User = mongoose.model("User", userSchema);
module.exports=user;