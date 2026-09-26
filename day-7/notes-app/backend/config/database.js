import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()


const database = async() => {

    try{
     await mongoose.connect(process.env.MONGO_URI);

     console.log("Database connect successfully");

    }catch(error){
     
        console.log("Failed to connect database", error);
    }
}


export default database;