const fs=require("fs");

fs.mkdir('chandu',(err)=>{
    console.log("folder created");
});

fs.writeFile("./chandu/c.txt","my name is chandu",(err)=>{//my name is chandu->show in c.text file
    console.log("file is creted in chandu folder");
});

fs.appendFile("./chandu/c.txt"," har har mahadev",(err)=>{
    console.log("data is appended in c.text file");
});

fs.readFile("./chandu/c.txt",'utf-8',(err,data)=>{
    console.log(data);//my name is chandu har har mahadev
});

fs.rename("./chandu/c.txt","./chandu/d.txt",(err)=>{
    console.log("rename is done");
});

fs.unlink("./chandu/c.txt",(err)=>{
    console.log("c.txt->file is deleted")
});

fs.unlink("chandu",(err)=>{
    console.log("chandu->folder is deleted")
});
