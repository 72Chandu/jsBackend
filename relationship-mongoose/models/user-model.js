const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/joitestdbrefrence", {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});
// const postSchema=mongoose.Schema({   m2 to handel post this is called embading of data
//     content: String,
//         date: {
//             type: Date,
//             default: Date.now
//         }
// })
const userSchema = new mongoose.Schema({
    username: String,
    email:String,
    password:String,
    posts: [{
        content: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    //posts:[postSchema] ->m2
});
module.exports = mongoose.model("User", userSchema);
