const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.get("/", function(req,res){
    res.send("hey");
});
app.post("/encrypt",async function(req,res){
    let salt=await bcrypt.genSalt(10); //geerate the random string. this random string is called salt. on the basis of this we hash the passwerd
    let encrypt=await bcrypt.hash("userpassward",salt);
    res.send(encrypt);
});

app.post("/checkpassword",async function(req,res){
    let result=await bcrypt.compare("userpassward","$2b$10$9ymTGzFUtWqCNyBu0xtLre6HBbIzZ3b.EdphASAb6oJ1oKThY5qOe")
    res.send(result);//true/false
});

app.get("/tokenmaker",function(req,res){  //huihui-> it is securate 
    let token=jwt.sign({name:"chandu"},"huihui");//in tokent thare is 3 thing in it (1.header 2.payload 3.varify signature. first dot tak algoritun 2nd dot tak data , 3rd dot tak signature
    res.send(token); // when you go to https://jwt.io/ you wil decode the token and get the data 
});

app.get("/fetchdatafromtoken",function(req,res){
   try{
    let data=jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhbmR1IiwiaWF0IjoxNzI1NTQxMjc3fQ.z7NuKecNE4hkMfJxnWx9E_pd5EmpuDvMCGB0Oo6Nrec" , "huihui");
     res.send(data);
   }catch(err){
    res.send("something went wrong");
   }  
});

app.get("/setcookie",function(req,res){ //cookie set karney ke liye aapko koi package ki need nahi hai
    res.cookie("age","25",{
        maxAge:2000, //jab tum setcookie route pe aayega to cookie show karaga . lakin jab tum / route pejayega to 2000ms ke baad delete hojayega nahi dikhega
        httpOnly:true, //can be readed by server not by browser
        secure:true,   //jab cookies web browser se server pe jayega tab o https ko follow kartey hue jayega 
    });
    res.send("cokkie set ho gaya hai")
});
app.get("/readcookie",function(req,res){ //cookie set karney ke liye aapko koi package ki need nahi hai
    res.send(req.cookies.age);
});
app.listen(3000);


/* authentication and authorization: authentication varifies your identity , and authorization verifies what resources you can access
1.tocken create karege derver par and usey save karege browser par, so agle baar jab v koi request aayega to us request me token v aayega and humeien pata chal jaayega ki wo user kon hai
 for this we use 
 a. bcrypt -> passwerd decript karney ke liye
 b.jwt -> token ke liye
 c.cookie-parser-> browser me save karne ke liye
->bcrypt is used to securely hash the passward by adding a salt and performing multiple hasing round which protects against brite force and rainbow table attacs
-> jwt=jab user ko login dena ho to aap ek token banaaie ye token save kardo frontend par(browser per) jab token stroe hojaye to fir us token ko hum har route me waapas paayenge aur us token me stored hoga  user ka data 
->c-p=aise koi v data jo aapka server ya webapp save kar raha hai aapka browser
data browser par save jo hua hai usey hi hum cookie khatey hai
->the signature in a JWT ensure that the token has not been altered and varifies that it was issued by a trusted source, maintaining the token's integrity and authenticity
->storing the jwt in a cookies with the httpOnly flag ensures that the token is sent with each HTTP request and is protected from access by javascript thereby mitigating the risk of cross-site scripting (xss) attacks
*/ 