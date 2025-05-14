import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()

export const authoMiddleware = async(req, res, next) => {
     
    try{
     const authHeder = req.header('Authorization');

     if(!authHeder || !authHeder.startsWith('Bearer ')){
        res.status(401).json({
            success: false,
            message: "Access denied"
        })
     }

     // token
     const token = authHeder.split(' ')[1];

     // decode 
     const decode = jwt.verify(token, process.env.SECRETE);

     req.user = decode;

     next()

    }catch(error){
       res.status(500).json({
        success: false,
        message: "Internal server error"
       })
    }
}