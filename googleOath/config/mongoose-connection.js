const mongoose=require("mongoose");
const db=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb");
    }catch(e){
        console.log("database connection error")
        process.exit(1);
    }
};
module.exports=db;