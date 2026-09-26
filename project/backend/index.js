const express = require('express');
const connectDatabase = require('./config/db');


const app = express();

// connect data base
connectDatabase()



const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})