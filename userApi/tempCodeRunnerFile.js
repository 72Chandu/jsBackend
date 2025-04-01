const http=require("http");//import http from "http";
const fs=require("fs");//import fs from "fs";
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.write('responce sending to other side responce mila na');
        res.end();
    }else if(req.url=="/about"){
        res.write('responce sending to aboutus side responce mila na');
        res.end();
    }
    else if(req.url=="/userAPI"){//D:\createfileWithCmd\userApi\userapi.json->path of json file
        fs.readFile(`${__dirname}/userapi.json`,"utf-8",(err,data)=>{
            if (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
            }
            //console.log(data);//jason print hoga in terminal-> PS D:\createfileWithCmd\userApi> node index10.js ->run this and search(http://localhost:8000/userAPI)
            //res.end(data);//array of an object ->run->S D:\createfileWithCmd\userApi> nodemon index10.js ->then you show the json on  ->http://localhost:8000/userAPI
            const objdata=JSON.parse(data);
            res.end(objdata[1].name);
        });
        res.write('responce sending to USERAPI side responce mila na');
        
    }else{
        res.writeHead(404, {"content-type":"text/html"});
        res.end("<h1>404 erroe page doesnot exit</h1>");
    }
});
server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to the port no 8000");
});