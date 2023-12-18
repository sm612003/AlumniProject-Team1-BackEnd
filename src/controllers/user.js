import bcrypt from "bcryptjs"
import User from '../models/user.js'
import { generateToken } from "../../utils/jwt.js";


const register = async (req, res) => {
  let { userName, email, password, role} = req.body;


  try {
    // Check if the email is already in use
    const verifyEmail = await User.findOne({ email: email });

    if (verifyEmail) {
      return res.status(401).json({
        message: "Email already used"
      });
    }

    // Check if the userName is already in use
    const existingUserName = await User.findOne({ userName:userName });
      if (existingUserName) {
        return res.status(401).json({
          message: "Username already used",
        });
    }

    email = email.toLowerCase()
    const newUser = await User.create({
      userName,
      email,
      password,
      role
    });

   

    return res.status(201).json({
      message: 'User successfully created please log in to your account!'
    });
  } catch (error) {
  res.status(500).json({
      error: error.message
    });
  }
}


const login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const jwtToken = generateToken(user)

    res.cookie('accessToken', jwtToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
    });

    return res.status(200).json({
      message:'user log in'
    });
  } catch (err) {
    return res.status(401).json({ message: err.message});
  }
};


export {register,login}