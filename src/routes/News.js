import  express from "express";
import { getAllNews , getNewsById , deleteNews , updateNews , addNews , getNewsByCategory, getlatestNews} from '../controllers/News.js';
import { upload } from "../middlewares/multer.js";
import {
    authenticateUser,
    authorizeUser
  } from "../middlewares/auth.js";
const newsRouter =express.Router()

newsRouter.get('/read/news', getAllNews);
newsRouter.get('/read/newsById/:id', getNewsById);
newsRouter.post('/add/news',authenticateUser,authorizeUser(['admin']),  upload.single("image") , addNews);
newsRouter.patch('/update/news/:id', authenticateUser,authorizeUser(['admin']), upload.single("image") , updateNews);
newsRouter.delete('/delete/news' ,authenticateUser, authorizeUser(['admin']),deleteNews)
newsRouter.get('/read/news/byCategory/:categoryName' ,getNewsByCategory)
newsRouter.get('/latest',getlatestNews)


export default newsRouter;