const fs=require("fs");
const { after } = require("node:test");

fs.writeFile("read.txt","today is awasome day",(err)=>{
     console.log("file is created");//shown in terminal
     //console.log(err);//null
});

//we pass the function as an argument -callback- that gets called when that task completed
//the callback has an argument that tells you whether the opeation completed successfully

fs.appendFile("read.txt","djfndwfj dfjdnfd dfd",(err)=>{
   console.log("data is added");
});

fs.readFile("read.txt","UTF-8",(err,data)=>{
    console.log(data);//today is awasome daydjfndwfj dfjdnfd dfd
});

