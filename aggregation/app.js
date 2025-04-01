const express = require("express");
const app =express();
const userModel = require("./models/user-model");
const postModel = require("./models/post-model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",async function(req,res){
    res.send("hello");
});

app.get("/test",async function(req,res){
    // let user =await userModel.find({name:"Alice"});//get all data whose name is Alice
    let user = await userModel.aggregate([//m-2
        {$match:{name:"Alice"}} //quary1 
        //quary2-> this quary applay on above quary ex:whose age is 40
        //quary2-> this quary applay on above quary , ex:who is from india
    ]);
    //res.send(user);
    let user2 = await userModel.aggregate([{
        $group:{
            //_id:"$email" //email ke basic par group kar do. sare email wale aa jayege
            _id:"$age",
            userdata:{
                //$push:"$name",// age ke sath name v aane lagega
                $push:"$$ROOT" , //age ke sath sare data v dikhega  
            }
        }
    }]);
    //res.send(user2);
    //kisi v collection me agar koi data ek id hai to aap uska data fill kr skte ho bilkul populate ki tarah with lookup
    let user3 = await postModel.aggregate([{
       $lookup:{
        from:"User",
        localField:"author",//post ki author id ko fill kar rahe hai or uska data user se laa rahe hai id fiels se
        foreignField:"_id",
        as:"authordata",
       },
    }]);
    //res.send(user3);
    let user4 = await postModel.aggregate([{
        $project:{
         name:1,//sare name aa jayega.do not do name:0
         age:1,//sare age with name aa jayega
         fullname:"$name",//name ke jagah pe fullname ho jayega
        },
     }]);
     //res.send(user4);
     let user5 = await postModel.aggregate([{
        $unwind:"$tags",//tage field ek array hai ,you see the number of  data on the basic of number of data in tag field
     }]);
     //res.send(user5)

     let posts=await postModel.aggregate([{
        $lookup:{
            from:"User",
            localField:"author",
            foreignField:"_id",
            as:"data",//kis naam se data rakhna hai.
        },
    },
    {
        $unwind:"$data",
    }, // data is array so, unbinf it on the basic of tage in data. due to array we can not use "." to access. so we make it object
    {
        $project:{
            title:1,
            content:1,
            "data.name":1,
            "data.email":1,
        },
    }
]);
res.send(posts);
});
app.listen(3000);