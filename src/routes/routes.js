import express from 'express'
import { getAllBlogs, getBlogById, deleteBlog, addBlog, updateBlog ,getBlogsByCategory} from '../controllers/Blog.js'
import { getAllNews , getNewsById , deleteNews , updateNews , addNews , getNewsByCategory} from '../controllers/News.js';
import { getAllNewsletters, getNewsletterById , addNewsletter , deleteNewsletterById } from '../controllers/Newsletter.js';
import { getAllSubscribedUser, getAllSubscribedUserById , addSubscribedUser , deleteSubscribedUserById } from '../controllers/subscribedUser.js';
import { getAllCategories, getCategoryById , deleteCategoryById , addCategory } from '../controllers/Category.js';

const router = express.Router()


// routers for blogs
router.get('/read/blogs',getAllBlogs);
router.post('/add/blogs', addBlog ) ;
router.get('/read/blogs/:id', getBlogById);
// router.get('/:id', findByCategory);
router.delete('/delete/blogs/:id', deleteBlog);
router.patch('/update/blogs/:id', updateBlog);
router.get('/read/blogs/:name', getBlogsByCategory);
// router.get('/read/blogs/byCategory/:id', getBlogsByCategory)


// routers for news 
router.get('/read/news', getAllNews);
router.get('/read/news/:id', getNewsById);
router.post('/add/news', addNews);
router.put('/update/news/:id', updateNews);
router.delete('/delete/news/:id' , deleteNews)
router.get('/read/news/byCategory/:id' ,getNewsByCategory)


// routers for newsletter 
router.get('/read/newsletter', getAllNewsletters);
router.get('/read/newsletter/:id', getNewsletterById);
router.post('/add/newsletter', addNewsletter);
router.delete('/delete/newsletter/:id' , deleteNewsletterById)


// routers for subscribed users 
router.get('/read/user', getAllSubscribedUser);
router.get('/read/user/:id', getAllSubscribedUserById);
router.post('/add/user', addSubscribedUser);
router.delete('/delete/user/:id' , deleteSubscribedUserById)


// routers for category 
router.get('/read/category', getAllCategories);
router.get('/read/category/:id', getCategoryById);
router.post('/add/category', addCategory);
router.delete('/delete/category/:id' , deleteCategoryById)

export default router