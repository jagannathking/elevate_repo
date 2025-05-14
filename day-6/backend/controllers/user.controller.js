import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Register 
export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }


        // check user exist or not
        const existUser = await User.findOne({ email });

        if (existUser) {
            res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }


        // hash the password
        const hashedPasseword = bcrypt.hashSync(password, 10);


        // create new user
        const user = new User({
            name,
            email,
            password: hashedPasseword
        })

        await user.save();

        res.status(200).json({
            success: true,
            message: "user created successfully"
        })

    } catch (error) {
       
        res.status(500).json({
            success: false,
            message:"Internal server error, try after some time",
            error: error.message
        })
    }
}


// Login
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        //user input validation

        if(!email || !password){
            res.status(400).json({
                success: true,
                message: "All fields are required"
            })
        }


        // check user is exist or not
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({
                success: false,
                message: "User is not exist, please Register"
            })
        }


        // compare the password
        const compare = bcrypt.compareSync(password, user.password);

        // jwt for authentication
        const token = jwt.sign({id: user._id, name: user.name, email: user.email},
            process.env.JWT_SECRET,
         {expiresIn: '7d'}
        )
         
        res.status(200).json({
            success: true,
            message: "User login successfully",
             token
        })


    }catch(error){
       
        res.status(500).json({
            success: false,
            message: "Internal server error, please try after sometime",
            error: error.message
        })

    }
}