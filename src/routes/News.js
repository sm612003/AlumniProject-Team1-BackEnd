import  express from "express";
import { getAllNews , getNewsById , deleteNews , updateNews , addNews , getNewsByCategory} from '../controllers/News.js';
import { upload } from "../middlewares/multer.js";

const newsRouter =express.Router()

newsRouter.get('/read/news', getAllNews);
newsRouter.get('/read/newsById', getNewsById);
newsRouter.post('/add/news',  upload.single("image") , addNews);
newsRouter.patch('/update/news',  upload.single("image") , updateNews);
newsRouter.delete('/delete/news' , deleteNews)
newsRouter.get('/read/news/byCategory/:categoryName' ,getNewsByCategory)


export default newsRouter