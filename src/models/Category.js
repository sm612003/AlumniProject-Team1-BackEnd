import mongoose, { Schema } from "mongoose";
const{schema,model} = mongoose;
const categorySchema = new Schema({
    name:{
        type:String,
        required: true}
});
const Category = model('Category',categorySchema);
export default Category;