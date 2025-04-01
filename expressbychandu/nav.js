const express=require("express");
const app=express();
const port=3000
app.get("/", (req,res)=>{
    res.write("<h1>welcome to home page<h1>")//write for multiple line
    res.write("<h1>welcome to my  page<h1>")
    res.send();
});
app.get("/about", (req,res)=>{
    res.send({// it show on port as jason formate
        id:1,
        name:"chandu"
    });
});
app.get("/about", (req,res)=>{
    res.jason({// methode 2 in this jason convert non-object such as null and undefined , which are not valid json
        id:1,
        name:"chandu"
    });
});
app.listen(port,()=>{
    console.log("hum ne sun liya hai jo tu ne bola port pe")// console me
});
//to serve static file such as image , css files and js file using(express.static(root, [option]))