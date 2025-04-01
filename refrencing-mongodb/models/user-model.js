const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/joitestdbrefrence");
const userSchema=mongoose.Schema({
    username: String,
    email:String,
    password:String,
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:"POST"}],
});
module.exports = mongoose.model("USER", userSchema); //user collection
