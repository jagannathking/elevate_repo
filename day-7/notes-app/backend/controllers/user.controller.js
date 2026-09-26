import User from '../models/user.model.js';
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerUser = async(req, res) => {
    
    try{
      const {name, email, password} = req.body;

      // user validation
      if(!name || !email || !password){
        return res.status(400).json({
            success: true,
            message: "All fields are required"
        })
      }

      // user is already exist or not
      const existing = await User.findOne({email});

      if(existing){
        res.status(400).json({
            success: false,
            message: "User already exist please login"
        })
      }


      // hash the password
      const hashPassword = brcypt.hashSync(password, 10);

      // create user
      const user = new User({
        name: name,
        email: email,
        password: hashPassword
      })


      await user.save();

      res.status(200).json({
        success: true,
        message: "User register successfully"
      })


    }catch(error){
      
        res.status(500).json({
            success: false,
            message: "server internal error",
            error: error.message
        })

    }
}


export const loginUser = async(req, res) => {

    try{
      const {email, password} = req.body;

      // user input validation
      if(!email || !password){
        res.status(400).json({
            success: false,
            message: "All fields are required"
        })
      }

      // find user exist or not
      const user = await User.findOne({email});


      if(!user){
        res.status(404).json({
            success: false,
            message: "User are exist, please register"
        })
      }
      

      // hash the password
      const comparePassword = brcypt.compareSync(password, user.password);

      if(!comparePassword){
        res.status(404).json({
            success:false,
            message: "Enter correct email and password"
        })
      }

      
      // jwt for authenication
      const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRETE,
        {expiresIn: '7d'}
      )

      res.status(200).json({
        success: true,
        message: "User logined successafully",
        token
      })

    }catch(error){
      res.status(500).json({
        success: true,
        message: "Server internal error",
        error: error.message
      })
    }

}