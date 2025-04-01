import {readFile , writeFile} from 'fs/promises';

//console.log(import.meta.url);// give the whole path of file in ESmodule

const filepath = new URL ('./index.html' , import.meta.url);// .->current folder, ..->backe of current folder
let content=await readFile(filepath, {encoding:'utf-8'});

//console.log(content);// show the html file content in terminal

const data={
    name: "chandrashekhar" ,
    company:"google",
}
for(const [key,value] of Object.entries(data)){
content=content.replace(`{${key}}`, value);
}
console.log(content);// data is writen in index file will show in terminal only not in file itself

await writeFile(filepath,content)// this will reflect in file itself

//await writeFile (new url('./newindex.html', import.meta.url), content)//this will create a new file and write the content in it

process.stdout.write("hi");//used in node js when you not want to ptint in new line

