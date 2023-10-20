import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.URL 
const PORT = process.env.PORT

const connect = async () => {
    try {
      await mongoose.connect(URL);
      console.log("Connected to mongoDB");
    } catch (error) {
      throw error;
    }
  };
export default connect;