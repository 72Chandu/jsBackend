const socketIo=require("socket.io");// npm i socket.io
const express=require("express");
const app=express();
const http=require("http");

const server=http.createServer(app);//express ke basis par server create kiye 
const io=socketIo(server);

app.set("view engine","ejs");
io.on("connection", function(socket){ 
    console.log("connected");
    //console.log(socket.id);//jitna user is server ko open karega utna id generate hoga.ex open 2 tab run this server you see 2 id
    
    // socket.on("disconnect",function(){ //jo user disconnect hoga uska message aajayega
    //     console.log("disconnected");
    // })

    // socket.on("abcd", function(data){//receving the data from frontend to backend
    //     console.log(data);
    // })
    
    // socket.on("abcd", function(){//sending the data from frontend to backend
    //     //io.emit("defg"); //jitna frontend connected hai sabko bhejo.ex: 1st tab open->usko milega, 2nd tab open ->usko milega lakin 1st wala ko v again milega
    //     socket.emit("defg");//jo connected hoga usko sirf bejega. ex: jo tab open karega usko milega  dusra tab  ko nahi milega 
    // })

    // BROADCASTING

    // socket.on("typing", function(){ 
    //     socket.broadcast.emit("typing");//khud ko recive nahi hoga lakin sabko hoga. current wala tab ko typing recive nahi hoga ku ki broadcat hu hai
    // })

    //ROOMS

    //socket.join("room1"); // allow for grouping sockets into rooms for broadcasting messages to all member of that room

    socket.on("disconnect",function(){
        console.log("disconnected");
    })

    socket.on("somemessage",function(data){//accepting data from client (frontend)
        console.log("custum event from frontend",data);
        //io.emit("message",data); //sending this data back to frontend, sabko milega
        socket.emit("message",data);
    })

    socket.on("typingmessage", function(){
        socket.broadcast.emit("typingmessage");// ek type karega to dura ko dikhega in console khud lo nahi dikhega
    })
});


app.get("/", function(req,res){
    res.render("index");
})
server.listen(3000);

/*frontend(index.ejs) par ek cdn hai usekae help se io fn call hota hai jab io chalega tab fronend se request jayega backend par with name connectio event. jitna baar page chalega/refresh hoga utna baar connection event backend aayega 
=backend par io and soket do hata hai
io-> jab aap ek se jada logo ko message dena chaahte ho to use ->io variable 
jab aap koi message ek user ko dena chaate ho -> use socket
=frotend par mainly socket variable hota hai

On the server side, io.on('connection', ...) is used to listen for incoming connections.
On the client side, io.connect() is used to initiate the connection with the server.

to send a custom event named 'message' from the client to the server using Socket.IO is:socket.emit('message', data)
to send a 'chat message' event with a message payload from the client-side using Socket.IO is:socket.emit('chat message', message)
*/


/*
agar aap message karoga to message to jayega but saamney wala ko browser ko refresh/reload karna parega us message ko dekhney ke liye 
browser reload karney se aap ek bar fir server par request bhejte ho and wo request server se bolti hai naya data do and wo data lekar aapke pass aati hai response

web-sokets use karney se aapka or server ka connection allwayse live rahta hai ex:uber,zemota,..
any changes i=on server will instantliy notify


WebSockets is a communication protocol that provides full-duplex (two-way) communication between a client (such as a web browser) and a server over a single, long-lived connection. Unlike traditional HTTP communication, which requires a client to request information from the server (request-response model), WebSockets allow the server to send data to the client at any time, without the client explicitly requesting it.

How it works:
Handshake: A WebSocket connection begins with an HTTP handshake initiated by the client. This handshake allows the server to upgrade the connection to WebSockets.
Open connection: Once the connection is established, the client and server can exchange data freely over a single, persistent connection until either party closes the connection.

websoket->protocal
soket.io->libarary
THEORY CONCEPTS

Overview of real-time communication.
Differences between WebSockets and Socket.10.


configiguration 
Installing Socket.I0 (both server-side and client-side). 
Basic server setup with Node.js and Express.
Basic client setup with HTML and JavaScript.

LEARN BY DOING STUFF
Establishing a connection between client and server.
Handling connection events (e.g., connect, disconnect).
Emitting events from the client to the server.
Emitting events from the server to the client.
Listening for events on both client and server.
Broadcasting to all connected clients.
Broadcasting to all clients except the sender.
Creatig and joining rooms.
Emitting events to specific rooms.
*/