const express = require("express");
const app =express();
const userModel = require("./models/user-model");
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
    try {
        const user = await userModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        user.posts.push({ content: req.body.content || "Default post content 2" });
        await user.save(); // Save the user with the new post
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});
app.listen(3000);
/* post man 
Create the user first:
Send a POST request to http://localhost:3000/create with the user data. Ensure the user is successfully created.
ex:localhost:3000/create on postman-> body me ja ke x-www-from-urlencoded-> create the user ex: username:rituraj 
Then add the post:
Send a POST request to http://localhost:3000/{username}/create/post with the post content.
Ensure that you're sending the correct username in the request. The URL should match the username exactly as it is stored in the database.
ex:localhost:3000/rituraj/create/post
then check the monodb your data is saved . with post array(1)->indicate one post 
*/