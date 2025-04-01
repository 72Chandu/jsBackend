const express=require("express");
const app=express();

const indexroute=require("./routes/indexroute");
const apiroute=require("./routes/apiroute");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use("/" ,indexroute);
app.use("/api" ,apiroute);

app.listen(3000);

/*
=>APIs allow your Node.js application to communicate with other applications or services. 
  For instance, you might use an API to retrieve data from a database, interact with a 
  third-party service, or integrate with other applications.
=>APIs is url by going inito it we show the data
=>in nodejs you can create a new instance of an express application by calling the express() 
  function. this function return an express application object that you can use to define routes
  middleware and othe application setting
-> if route me /api rahe to menas it is not rendering it will give data 


Rendering
Rendering refers to the process of generating the final HTML that is sent to the user's browser. 
This can happen on the server side or the client side.

Server-Side Rendering (SSR): The server generates the HTML for a web page and sends it to the 
client. This approach is used in frameworks like Express with templating engines (e.g., EJS, Pug). 
For instance, an Express app might use EJS to render HTML views dynamically based on data from a database.

Client-Side Rendering (CSR): The browser (client) generates the HTML dynamically using JavaScript. 
This approach is often used with frontend frameworks like React, Angular, or Vue.js. The server 
typically sends a minimal HTML file and JavaScript, and the client renders the page by manipulating the DOM.

API Development
API Development involves creating endpoints that allow different software applications to communicate 
with each other. In the context of web development, APIs often provide data to client applications 
(like web or mobile apps) and can perform actions such as CRUD (Create, Read, Update, Delete) operations.

RESTful APIs: These use HTTP methods (GET, POST, PUT, DELETE) to interact with resources. They return data typically in JSON or XML format.
GraphQL APIs: These allow clients to request exactly the data they need by defining queries and mutations.

Summary
Rendering is about generating and delivering the HTML for web pages, whether on the server or client side.
API Development is about creating interfaces for data exchange and interaction between different software components.
*/