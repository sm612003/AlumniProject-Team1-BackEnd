import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },


})

const User = mongoose.model("User", userSchema)

export default User 