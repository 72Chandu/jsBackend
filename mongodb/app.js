const express=require('express');
const app=express();
const mongooseconnection=require("./config/mongoose");
const userModel=require("./models/user");

//const debuglog=require("debug")("development:app"); //kam nahi kar raha hai
app.get("/", (req,res,next)=>{
    res.send("hey")
});

// app.get("/create", async function(req,res,next){//for creating a database
//     let createduser=await userModel.create({
//         username:"chandu",
//         name:"chandrashekhar",
//         email:"chandu@gmail.com",
//         password:"pass"
//     })
//     console.log("user created");//jab tak upper code nahi chalegega tab tak ye print nahi hoga. wo tab chalega jab tum useke route pe jayega
//     res.send(createduser);
// });//now this data is created on database . you can see it on mongodb compass 

// app.get("/read",async function(req,res,next) { //reading data from databse
//     let user=await userModel.findOne({name:"chandrashekhar"}) // name ke jagh pe jo tum khojna chatey ho ex:email, password..etc.this will read only one user
//     //let user=await userModel.find(); // reading all data from databse 
//     console.log("readed");
//     res.send(user);
// });


// app.get("/update",async function(req,res,next){
//     //let user=await userModel.findOneAndUpdate({name:"chandrashekhar"},{name:"dipraj anand"});// database me update ho jayega. but send the privious object not updated object on this route.
//     let user=await userModel.findOneAndUpdate({name:"chandrashekhar"},{name:"dipraj anand"},{new:true});//now it will update at both place
//     res.send(user);
// });

// app.get("/delete",async function(req , res){ // for deleting data from the database 
//     let user=await userModel.findOneAndDelete({name:"chandrashekhar"});
//     res.send(user);
//     console.log(user);
// })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post("/create",async function(req,res,next){ //user is created-> is route pe jao postman me->body->x-www-from-urlencoded->key or value me change karo->post->send->you se the res 
    let{name,email,password,username}=req.body;
    let createduser=await userModel.create({
        name:name,
        email:email,
        username:username,
        password:password
    })
    res.send(createduser);
})

app.get("/users", async function (req,res,next) {//is route pe jitna user creted hoga o sab dikh jayega
  let user=await userModel.find();
  res.send(user);  
})

app.get("/users/:username", async function (req,res,next) {//jis user ka username route pe daloge uska data show hoga is route pe
    let user=await userModel.findOne({username:req.params.username});
    res.send(user);  
})

app.get("/update/:username", async function (req,res,next) {//jis user ka username route pe daloge uska data show hoga or usko update karna hai
    let {name,email,username}=req.body;
    let newuser=await userModel.findOneAndUpdate({username:req.params.username},{username,name,email});
    res.send(newuser);
})

app.get("/delete/:username", async function (req,res,next) {//jis user ka username route pe daloge uska data show hoga or usko update karna hai
    let {name,email,username}=req.body;
    let deleteduser=await userModel.findOneAndDelete({username:req.params.username});
    res.send(deleteduser);
})
app.listen(3000);