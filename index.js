const fs=require("fs");//including the file system module
fs.writeFileSync('read.text',"welcome you create a file from index.js")//file is creating syncronousley
//fs.writeFileSync('read.text',"welcome you create a file from index.js")-> when you run this then it will erase the previous data from text and write this
fs.appendFileSync('read.text'," this will written in text file at the end of its previous data")//(welcome you create a file from index.js this will written in text file at the end of its previous data)->show in read.text
const readData=fs.readFileSync('read.text');
//console.log(readData);//<Buffer 77 65 6c 63 6f 6d 65 20 79 6f 75 20 63 72 65 61 74 65 20 61 20 66 69 6c 65 20 66 72 6f 6d 20 69 6e 64 65 78 2e 6a 73 20 74 68 69 73 20 77 69 6c 6c 20 ... 52 more bytes>
//node js include an additional data type calles buffer(not available in browser's javascript), buffer is mainly used to store binary data ,while reaing from file or reciving packed over the network
const actualData=readData.toString();
console.log(actualData)//(welcome you create a file from index.js this will written in text file at the end of its previous data)->show in index.js->terminal
//fs.renameSync('read.tex','readWrite.text')//this will rename the file
//fs.mkdirSync("newfolder")//this will create a new folder