/*
Caching is a technique used in computing to temporarily store data in a high-speed storage layer, known as a cache, so that future requests for that data can be served faster. The idea is to reduce the time and resources needed to fetch or compute the data by keeping frequently accessed information in a location that is faster to access than the primary data source.*/
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const userModel=require("./models/user-model");
const redis=require("redis");
const { json } = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/*redis is real time data plateform -> npm i redis and then you mush have to sign in redis website , database->cash->aws->mumbai->30mb->createdatabse
public endpoint ke nichey make green then-> connect -> 1. redis cli 2.radis client-> connect with node package */
mongoose.connect("mongodb://127.0.0.1:27017/cashing").then(()=>{
    console.log("connected to database");
})


const client = redis.createClient({ //client is the connection between nodejs and redis
    password: 'KQaD9niwnZlX2IuRj6DdjuCIaI5S1A6Q',
    socket: {
        host: 'redis-11177.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11177
    }
});
client.on("connect", ()=>{
    console.log("connect to redis");
})
client.connect();
app.post("/create", async(req,res)=>{
    const {name, email}=req.body;
    try{
        const user=await userModel.create({name,email});
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
});

app.get("/users/:id", async(req,res)=>{
    try{
        let data=await client.get(`user:profile:${req.params.id}`);//jab server chalega tab data cash me save hoga or o data me fetch hojayega
        if(data){//ye tab chalega jab data cached me hoga . warna data ko db se directly fetch karna hoga
            //return res.send(JSON.stringify(data));
            return res.send("data cached se aaya hai")
        } 
        const user=await userModel.findOne({_id:req.params.id});
        if(!user){
            res.status(400).send("user not found");
        }
         //await client.set(`user:profile:${req.params.id}`,JSON.stringify(user));//user ka pura data ko set karna chatey hai cache me which is uniquely identify through (user:profile:userID)
         await client.setEx(`user:profile:${req.params.id}`,5 ,JSON.stringify(user));//5 sec ke baad data delete hojayega cash se 
         //await client.del(`user:profile:${req.params.id}`); //delete the cashed data 
         res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
});
app.listen(3000);