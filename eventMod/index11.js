const EventEmitter=require("events");//creating class with the help of events module 
const event=new EventEmitter();//creating object instance 

// event.on('fired_once', ()=>{//1 registering for event to be fired only one time using once
//     console.log("your name is chandu")
// });
// event.on('fired_once', ()=>{
//     console.log("your name is digambe")
// });
// event.on('fired_once', ()=>{
//     console.log("your name is chandani")
// });
// event.on('fired_once', ()=>{
//     console.log("your name is pushpa")
// });
// event.emit("fired_once");// we can call many fn at once having same 

event.on('checkPage',(sc,msg)=>{
    console.log(`status code is ${sc} and page is ${msg}`);
});
event.emit("checkPage",200, "ok");