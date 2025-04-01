const express=require("express");
const app=express();
require("dotenv").config();
const connectToDB=require("./config/mongoose-connection");
const cookieParser=require("cookie-parser");
const authRoutes=require("./routes/authRoutes");

connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.listen(3000);