const mongoose=require('mongoose')

async function connectDB(){
    const dns=require("dns");
    dns.setServers(['1.1.1.1','8.8.8.8']);
    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");

    }catch(err){
        console.error("Database connection error:",err);

    }
    
}
module.exports=connectDB;