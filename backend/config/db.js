const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");

const connectDB = async()=>{
    try{

        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected ${mongoose.connection.host}`) 
        
    }catch(error){
        console.log("connection error",error.message)
    }
};

module.exports = connectDB;