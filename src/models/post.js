import mongoose from "mongoose";

const postSchema= mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    // date:{
    //     type:Date,
    //     default:Date.now
    // },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required: false 
    }, 
    categoryID:{
        type :String,
        required:true,
        unique:true
    }
},{
    timestamps : true
}
)

const PostMessage= mongoose.model("PostMessage", postSchema)

export default PostMessage