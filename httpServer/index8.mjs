//the http.createServer() methode include request and resoponce parameters which is supplied by node.js
//the request object can be used to get information about the current HTTP request e.g url,request,header,data
//the responce object can be used to send a responce for a current HTTP request
//if the responce from the HTTP server is supposed to be displayed as HTML,you should
//include an HTTP header with the correct content type
import http from "http";
const server=http.createServer((req,res)=>{
    //console.log(req.url);//  /  /favicon.ico ->where is favicon
    if(req.url=="/"){
        res.write('responce sending to other side responce mila na');//show at->localhost:8000
        res.end();//ending the responce that you give
    }else if(req.url=="/about"){//http://localhost:8000/about->when you search this then it encounter else part
        res.Write('responce sending to aboutus side responce mila na');
        res.end();
    }
    else if(req.url=="/conatact"){//http://localhost:8000/conatact->when you search this then it encounter else part
        res.write('responce sending to conatactus side responce mila na');
        res.end();
    }else{
        res.writeHead(404, {"content-type":"text/html"}); //now in network section you will see the 404 / you also see the error in console
        //res.end("404 erroe page doesnot exit")//in this case you see the 200 as status code but for error it is not true/ type->document
        res.end("<h1>404 erroe page doesnot exit</h1>")// in this case type->html ->network me dekhega, if document is shown->right click on the (whatshep) which you searching(http://localhost:8000/Whatshep)->header ->responce header->cotent-type
    }
});
server.listen(8000,"127.0.0.1",()=>{//127.0.0.1->local host
    console.log("listening to the port no 8000");
});


//when you inspact the page and go to the ->network-> look status(if status 100-199->informational responce, 200-299->successful responce, 400-499->clint error, 500-599->server error)