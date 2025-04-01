const http=require("http");//import http from "http";
const fs=require("fs");//import fs from "fs";
const server=http.createServer((req,res)=>{
     const data=fs.readFileSync(`${__dirname}/userapi.json`,"utf-8");//-> ek bar hi file ko read karega
     const jsonData=JSON.parse(data);

    if(req.url=="/"){
        res.write('responce sending to other side responce mila na');
        res.end();
    }
    else if(req.url=="/userAPI"){//D:\createfileWithCmd\userApi\userapi.json->path of json file
        res.writeHead(200,{"content-type":"application/json"});
        // fs.readFile(`${__dirname}/userapi.json`,"utf-8",(err,data)=>{
        //     if (err) {
        //         console.error(err);
        //         res.writeHead(500, { "Content-Type": "text/plain" });
        //         res.end("Internal Server Error");
        //         return;
        //     }
        //     //console.log(data);//jason print hoga in terminal-> PS D:\createfileWithCmd\userApi> node index10.js ->run this and search(http://localhost:8000/userAPI)
        //     //res.end(data);//array of an object ->run->S D:\createfileWithCmd\userApi> nodemon index10.js ->then you show the json on  ->http://localhost:8000/userAPI
        //     const jsonData=JSON.parse(data);
             res.end(jsonData.employees[1].name);//ek bar me ek hi res.end hoga ->Alice Johnson
        // });-> jitna bar refresh kaega utna baar file ko read karega-> is purra readfile ko uper me likha sync me
    }else{
        res.writeHead(404, {"content-type":"text/html"});
        res.end("<h1>404 erroe page doesnot exit</h1>");
    }
});
server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to the port no 8000");
});