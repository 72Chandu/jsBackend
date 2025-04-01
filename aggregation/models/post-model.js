const mongoose = require('mongoose');
const postSchema=mongoose.Schema({
    title:String,
    content:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:"USER"},
    createdAt:{type:Date, default:Date.now}
});
const Post = mongoose.model("Post", postSchema);
module.exports=Post;