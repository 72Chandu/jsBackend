const express = require("express");
const app =express();
const userModel = require("./models/user-model");
const postModel = require("./models/post-model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to create a new user
app.post("/create", async (req, res) => {
        const createdUser = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send(createdUser);
});

app.post("/:username/create/post", async (req, res) => {
        let user = await userModel.findOne({ username: req.params.username });
        let createdPost=await postModel.create({
            content:"post is refrencing from post-model.js",
            user:user._id  //pure user me se id nikal lega. post ko pta hai kis user ne bnaya hai through this line
        })
        user.posts.push(createdPost._id);//ab user ko pta hai kisney ye post bnaya hai 
        await user.save(); // Save the user with the new post
        res.send({user , createdPost});
});

app.get("/post",async function(req,res){
    //let posts =await postModel.find();//get all post. es se ptan nahi chalega kis user ka hai 
    let posts =await postModel.find().populate("user");//all details which are in user field , jo filed dega uske hissab se populate hoga 
    res.send(posts);
});

app.get("/users",async function(req,res){
    //let users =await userModel.find();//get all post. es se ptan nahi chalega kis user ka hai 
    let users =await userModel.find().populate("posts");//all details which are in post field 
    res.send(users);
})
app.listen(3000);
/*
1.localhost:3000/create -> create user by filling the data according to schema 
2.localhost:3000/d arun kumar/create/post -> check it show the data that you created at this route
{
    "user": {
        "_id": "66b78f47b952d8c6263fb63d",
        "username": "d arun kumar",
        "password": "pasesa",
        "posts": [
            "66b793c995fbefece9811554" -> user ke pass post ki id aa gai
        ],
        "__v": 1
    },
    "createdPost": {
        "user": "66b78f47b952d8c6263fb63d",  -> post ke pass user ki id aa gai
        "content": "post is refrencing from post-model.js",
        "_id": "66b793c995fbefece9811554",
        "__v": 0
    }
}
    dono ke pass ek dusre ka id hai 
    joitestdbrefrence -> me 2 (1.users 2.posts)
*/