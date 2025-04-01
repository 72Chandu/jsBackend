const mongoose = require('mongoose');
const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    content:String,
});
module.exports = mongoose.model("POST", postSchema); //post collection