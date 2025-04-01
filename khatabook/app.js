const express=require('express');
const app=express();
const path=require('path');
const fs=require("fs");
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    fs.readdir(`./hissab`, function(err, files){
        if(err) return res.status(500).send(err);
        res.render("index", {files:files});
        //console.log(err,files);
    });
});
app.get("/create", function(req , res){
    res.render("create");
});
app.post("/createhisaab", function(req , res){
    var currDate=new Date();
    var date=`${currDate.getDate()}-${currDate.getMonth()+1}-${currDate.getFullYear()}`;
    fs.writeFile(`./hissab/${date}.txt`, req.body.content , function(err){
        if(err) return res.status(500).send(err);
        res.redirect("/");
    });
    // fs.writeFile(`./hissab/${req.body.title}.txt`, req.body.content , function(err){
    //     if(err) return res.status(500).send(err);
    //     res.redirect("/");
    // });
    //res.send(req.body);
});
app.get("/edit/:filename", function(req , res){
    fs.readFile(`./hissab/${req.params.filename}`,"utf-8" , function(err,filedata){
        if(err) return res.status(500).send(err);
        res.render("edit",{filedata , filename:req.params.filename});
    })
    
});
app.post("/update/:filename", function(req , res){
    fs.writeFile(`./hissab/${req.params.filename}`, req.body.content , function(err){
        if(err) return res.status(500).send(err);
        res.redirect("/");
    });
});
app.get("/hissab/:filename", function(req , res){
    fs.readFile(`./hissab/${req.params.filename}`,"utf-8",function(err, filedata){
        if(err) return res.status(500).send(err);
        res.render("hissab", {filedata , filename:req.params.filename});
    });
});
app.get("/delete/:filename", function(req , res){
    fs.unlink(`./hissab/${req.params.filename}`,function(err){
        if(err) return res.status(500).send(err);
        res.redirect("/");
    });
});
app.listen(3000);