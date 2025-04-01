//streams helps to read or wite the data chunk by chunk (one by one)
const fs=require('fs');
const readstream=fs.createReadStream(__dirname + '/index.mjs');
const writestream=process.stdout;
readstream.pipe(writestream);// read in chunck by chunk you see when you have large no data in file
