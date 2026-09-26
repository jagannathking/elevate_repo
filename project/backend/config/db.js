const mongoose = require('mongoose');


const connectDatabase = async() => {

    try{
      await mongoose.connect(URI)
      console.log("Database connected sucessfully")
    }catch(error){
      console.log("Failed to connect database", error)
    }


}

module.exports = connectDatabase