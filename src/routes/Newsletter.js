import  express  from "express";
import { getAllNewsletters, getNewsletterById , addNewsletter , deleteNewsletterById } from '../controllers/Newsletter.js';

const newsletterRouter = express.Router()

newsletterRouter.get('/read/newsletter', getAllNewsletters);
newsletterRouter.get('/read/newsletter/:id', getNewsletterById);
newsletterRouter.post('/add/newsletter', addNewsletter);
newsletterRouter.delete('/delete/newsletter/:id' , deleteNewsletterById)

export default newsletterRouter;