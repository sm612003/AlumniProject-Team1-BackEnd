import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.URL 
const PORT = process.env.PORT

mongoose.connect(URL, {
    useNewUrlParser: true, 
    // useUnifiedTypology:true
})
.then(()=> ()=> console.log(`Server running on port: ${PORT}`))
.catch((error)=> console.log(error.message))

export default mongoose;