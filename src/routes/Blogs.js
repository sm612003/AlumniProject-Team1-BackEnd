import express  from "express";
import { getAllBlogs, getBlogById, deleteBlog, addBlog, updateBlog ,getBlogsByCategory} from '../controllers/Blog.js'

const blogRouter= express.Router()

blogRouter.get('/read/blogs',getAllBlogs);
blogRouter.post('/add/blogs', addBlog ) ;
blogRouter.get('/read/blogsById/:id', getBlogById);
blogRouter.delete('/delete/blogs', deleteBlog);
blogRouter.patch('/update/blogs', updateBlog);
blogRouter.get('/read/blogs/byCategory/:name', getBlogsByCategory);


export default blogRouter