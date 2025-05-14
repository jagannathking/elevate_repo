import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async() =>{
   try{
     await mongoose.connect(process.env.URI)
     console.log("Data base connected successfully");

   }catch(error){
     console.log("Failed to connected data base", error);
   }
}


export default database;
