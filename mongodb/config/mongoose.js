const mongoose=require('mongoose');//npm i mongoose
//const debuglog=require("debug")("development:mongooseconfig");//kam nahi kar rha hai
mongoose.connect(  // this taken from atles online
   "mongodb+srv://82Chandu:3AXQHK83991H5epg@cluster0.jtrle.mongodb.net/testingdb?retryWrites=true&w=majority&appName=Cluster0"
).then(function(){
    console.log("connected to database");
})//we are connecting mongoose
const db=mongoose.connection; //extracting the connection of mongoose
db.on("error",function(err){
    console.log(err);
})
db.on("open",function(){
    console.log("connected to the database in open option");
})
module.exports=db;
/*
paaward=3AXQHK83991H5epg
"mongodb+srv://82Chandu:<passward>@cluster0.jtrle.mongodb.net/<yourDatabaseName>?retryWrites=true&w=majority&appName=Cluster0"
To find and view your database in MongoDB Compass, follow these steps:

Open MongoDB Compass:
Launch MongoDB Compass on your machine.

Connect to Your MongoDB Cluster:
Use the connection string to connect to your MongoDB cluster:

mongodb+srv://82Chandu:QHK83991H5epg@cluster0.jtrle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster

Click on "New Connection".
Paste the connection string into the "Paste your connection string (SRV or standard) here" field.
Click "Connect".
Navigate to the Database:
Once connected, MongoDB Compass will show you a list of databases available in your cluster.

Select Your Database:

Look for the database you specified in your connection string.
Click on your database to open it.
View Collections:
Inside your database, you will see a list of collections.
Click on the users collection to view the documents within it.
Verifying the User Document
View Documents:
Click on the users collection.
You will see a list of documents in the collection.
You should see the document you inserted, 
.*/

