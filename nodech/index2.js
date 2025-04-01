const fs =require("fs");
//fs.mkdirSync("newfolder");//if you run then it will note create a folder then do->({cd --} then {dir} then{ cd .\nodech\} then{cls} then{node index.js} now new folder is created )-> in terminal
fs.writeFileSync("newfolder/bio.text","ky kar raha hai");//fs.mkdirSync("newfolder")-> commant kar ke then run -> then new file in creted in newfolder
fs.appendFileSync("newfolder/bio.text"," nach rahe hai")
const data =fs.readFileSync("newfolder/bio.text","utf8")//utf8 is encoding to convert buffer data into string
console.log(data)//ky kar raha hai nach rahe hai
//fs.renameSync("newfolder/bio.text","newfolder/mybio.text")//rename the bio.text
//fs.unlinkSync("newfolder/bio.text") -> deleting bio.text file onley
//fs.rmdirSync("newfolder")//folder is deletet



