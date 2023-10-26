import  express from "express";
import { getAllNews , getNewsById , deleteNews , updateNews , addNews , getNewsByCategory} from '../controllers/News.js';

const newsRouter =express.Router()

newsRouter.get('/read/news', getAllNews);
newsRouter.get('/read/news', getNewsById);
newsRouter.post('/add/news', addNews);
newsRouter.patch('/update/news', updateNews);
newsRouter.delete('/delete/news' , deleteNews)
newsRouter.get('/read/news/byCategory/:name' ,getNewsByCategory)


export default newsRouter