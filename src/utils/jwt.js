import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt'
export const generateToken = (user) => {
    const payload = {
        id : user.id ,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ,
        role: user.role,
    }
    return jwt.sign(payload , "secretKey" , {expiresIn: '4h'})
} // utils

export const verifyToken = (token) => {
    try {
        return jwt.verify(token , "secretKey")
    } catch (error){
        return null
    }
} // utils

export const comparePassword = async (password , hashedPassword) => {
    return bcrypt.compare(password , hashedPassword)
  }

//   export const hashPassword = async (password) => {
//     const saltRounds = 10; ;
//     return bcrypt.hash(password, saltRounds);
//   } // inside schema
  // utils/jwt.js


export const hashPassword = async (password) => {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Propagate the error further
  }
};