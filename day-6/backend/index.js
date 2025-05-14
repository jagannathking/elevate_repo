import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();


// PORT
const PORT = process.env.PORT 


// server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
