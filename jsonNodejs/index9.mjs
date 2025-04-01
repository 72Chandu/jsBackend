import fs from "fs";
const biodata={
    name:"chandu",
    age: 12,
    gender: "male"
}
const jsondata=JSON.stringify(biodata);//converting object to json
//console.log(jsondata);//{"name":"chandu","age":12,"gender":"male"}
//console.log(jsondata.name)->error
const objData=JSON.parse(jsondata);//converting the json to object 
console.log(objData);
fs.writeFile('json1.json',jsondata,(err)=>{//creating 'json1.json' file and adding 'jsondata' to it
   console.log("file is added");
});

fs.readFile("json1.json","utf-8",(err,data)=>{
  //console.log(data);//{"name":"chandu","age":12,"gender":"male"}
  const originalData=JSON.parse(data);
  console.log(originalData);//{ name: 'chandu', age: 12, gender: 'male' }
});