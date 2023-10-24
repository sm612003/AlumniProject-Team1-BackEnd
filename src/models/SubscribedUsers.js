import mongoose from "mongoose";
const {Schema, model} = mongoose;
const subscribedUserSchema = new Schema({
    email:{
        type:String,
        required:true, 
        unique: true}
});
const SubscribedUser = model('SubscribedUser',subscribedUserSchema);
export default SubscribedUser;