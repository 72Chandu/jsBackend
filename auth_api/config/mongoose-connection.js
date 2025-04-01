const mongoose=require("mongoose");
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("CONNECTED TO DB");
    }catch(err){
        console.log("mongoose connection errpr:",err);
        process.exit(1);//aage application nahi chalega
    }
};
module.exports=connectDb;