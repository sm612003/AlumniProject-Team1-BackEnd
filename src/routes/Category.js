import  express  from "express";
import { getAllCategories, getCategoryById , deleteCategoryById , addCategory } from '../controllers/Category.js';

const categoryRouter = express.Router();

categoryRouter.get('/read/category', getAllCategories);
categoryRouter.get('/read/category/:id', getCategoryById);
categoryRouter.post('/add/category', addCategory);
categoryRouter.delete('/delete/category/:id' , deleteCategoryById)

export default categoryRouter;