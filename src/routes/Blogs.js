import express  from "express";
import { getAllBlogs, getBlogById, deleteBlog, addBlog, updateBlog } from '../controllers/Blog.js'
import { upload } from "../middlewares/multer.js";
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";


const blogRouter= express.Router()

blogRouter.get('/read/blogs',getAllBlogs);
blogRouter.get('/read/blogsById/:id', getBlogById);
blogRouter.post('/add/blogs',authenticateUser,
authorizeUser(["admin","user"]),upload.single("image") , addBlog ) ;
blogRouter.patch('/update/blogs',authenticateUser,
authorizeUser(["admin","user"]),upload.single("image") , updateBlog);
blogRouter.delete('/delete/blogs/:id',authenticateUser,
authorizeUser(["admin","user"]), deleteBlog);
// blogRouter.get('/read/blogs/byCategory', getBlogsByCategory);


export default blogRouter