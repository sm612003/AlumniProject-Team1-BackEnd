import express  from "express";
import { getAllBlogs, getBlogById, deleteBlog, addBlog, updateBlog ,getBlogsByCategory} from '../controllers/Blog.js'
import { upload } from "../middlewares/multer.js";

const blogRouter= express.Router()

blogRouter.get('/read/blogs',getAllBlogs);
blogRouter.get('/read/blogsById/:id', getBlogById);
blogRouter.post('/add/blogs',upload.single("image") , addBlog ) ;
blogRouter.patch('/update/blogs',upload.single("image") , updateBlog);
blogRouter.delete('/delete/blogs', deleteBlog);
blogRouter.get('/read/blogs/byCategory', getBlogsByCategory);


export default blogRouter