const express=require('express');
const app=express();
const userModel=require("./models/user")
const dummyUsers = [
    {
        username: "john_doe",
        name: "John Doe",
        password: "password123",
        age: "30",
        isMarried: true,
        email: "john@example.com"
    },
    {
        username: "jane_smith",
        name: "Jane Smith",
        password: "password456",
        age: "28",
        isMarried: false,
        email: "jane@example.com"
    },
    {
        username: "alice_wonder",
        name: "Alice Wonder",
        password: "password789",
        age: "35",
        isMarried: true,
        email: "alice@example.com"
    },
    {
        username: "bob_builder",
        name: "Bob Builder",
        password: "password321",
        age: "40",
        isMarried: false,
        email: "bob@example.com"
    },
    {
        username: "charlie_brown",
        name: "Charlie Brown",
        password: "password654",
        age: "25",
        isMarried: false,
        email: "charlie@example.com"
    },
    {
        username: "diana_prince",
        name: "Diana Prince",
        password: "password987",
        age: "32",
        isMarried: true,
        email: "diana@example.com"
    },
    {
        username: "bruce_wayne",
        name: "Bruce Wayne",
        password: "password741",
        age: "38",
        isMarried: false,
        email: "bruce@example.com"
    },
    {
        username: "clark_kent",
        name: "Clark Kent",
        password: "password852",
        age: "34",
        isMarried: true,
        email: "clark@example.com"
    },
    {
        username: "lois_lane",
        name: "Lois Lane",
        password: "password963",
        age: "31",
        isMarried: true,
        email: "lois@example.com"
    },
    {
        username: "peter_parker",
        name: "Peter Parker",
        password: "password159",
        age: "22",
        isMarried: false,
        email: "peter@example.com"
    },
    {
        username: "tony_stark",
        name: "Tony Stark",
        password: "password753",
        age: "45",
        isMarried: true,
        email: "tony@example.com"
    },
    {
        username: "steve_rogers",
        name: "Steve Rogers",
        password: "password369",
        age: "100",
        isMarried: false,
        email: "steve@example.com"
    },
    {
        username: "natasha_romanoff",
        name: "Natasha Romanoff",
        password: "password147",
        age: "35",
        isMarried: false,
        email: "natasha@example.com"
    },
    {
        username: "thor_odinson",
        name: "Thor Odinson",
        password: "password258",
        age: "1500",
        isMarried: false,
        email: "thor@example.com"
    },
    {
        username: "wanda_maximoff",
        name: "Wanda Maximoff",
        password: "password369",
        age: "29",
        isMarried: true,
        email: "wanda@example.com"
    }
];
app.get("/",async (req,res,next) => {
    res.send('working');
})
app.get("/createmany",async (req,res,next) => {//insert too many user at onece
    let data=await userModel.insertMany(dummyUsers);
    res.send(data);
})
app.get("/users",async (req,res,next) => {
    // let user=await userModel.find({age:30});//we get the user whose age is 30
    // let user=await userModel.find({age:{$eq:30}});//we get the user whose age is equal to 30
    //let user=await userModel.find({age:{$ne:30}});//we get the user whose age is not equal to 30
    //let user=await userModel.find({age:{$lt:27}});//we get the user whose age is less then 27
    //let user=await userModel.find({age:{$lte:27}});//we get the user whose age is less then equal to 27
    //let user=await userModel.find({age:{$gt:27}});//we get the user whose age is greater then 27
    //let user=await userModel.find({age:{$gte:27}});//we get the user whose age is greater then equal to 27
    //let user=await userModel.find({age:{$in:[25,30,27]}});//we get the user whose age is array
    //let user=await userModel.find({age:{$nin:[25,30,27]}});//we get the user whose age is not in array
    //let user=await userModel.find({isadmin:{$exists:false}});//we get the user whose filed has not a isadmine.if we write true then it give those who have isadmine field
    //let user=await userModel.find({$and:[{isMarried:false},{age:{$gte:18}}]});//we get the user whose age is >=18 and not married
    let user=await userModel.find({$or:[{isMarried:false},{age:{$gte:18}}]});//we get the user whose age is >=18 or not married
    //or ,and apply on multiple condition
    /*  regex -> take help with gpt
    starts with -> ^
    end with -> $
    in miffle n number of letters -> .*
    */
    res.send(user);
})
app.listen(3000);