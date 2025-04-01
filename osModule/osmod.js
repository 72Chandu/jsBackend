const os=require("os");
console.log(os.arch());//show the architecture of your system=x64
console.log(os.hostname());//dipraj-anand
console.log(os.platform());//win32
console.log(os.type());//Windows_NT
const freeMemory=os.freemem();
console.log(freeMemory);//2695213056-> in bytes
console.log(`${freeMemory/1024/1024/1024}`);//2.5374908447265625 gb ram is left in my system

const totalMemory=os.totalmem();
console.log(`${totalMemory/1024/1024/1024}`);//7.326206207275391-> total ram in my system
