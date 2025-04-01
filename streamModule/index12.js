const fs=require("fs");
const http=require("http");
const server=http.createServer();
server.on('request',(req,res)=>{//stremig the input.txt file on server at port 8000
    // var fs=require("fs");
    // fs.readFile('input.txt',(err, data)=>{
    //     if(err) return console.error(err);
    //     res.end(data.toString());
    // });
    //methode 2
    // const readableStream=fs.createReadStream("input.txt");
    // readableStream.on('data',(chunkdata)=>{
    //     res.write(chunkdata); 
    // })
    // readableStream.on('end',()=>{
    //     res.end(); 
    // })
    // readableStream.on('error',(err)=>{
    //     console.log(error)
    //     res.error("file not found");//no such file is exit
    // })

    //methode 3
    const readableStream=fs.createReadStream("input.txt");
    readableStream.pipe(res);

})
server.listen(8000, "127.0.0.1");