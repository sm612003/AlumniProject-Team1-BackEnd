import  express  from "express";
import { getAllNewsletters, getNewsletterById , addNewsletter , deleteNewsletterById  , updateNewsletterEmails} from '../controllers/Newsletter.js';
const newsletterRouter = express.Router()

newsletterRouter.get('/read/newsletter', getAllNewsletters);
newsletterRouter.get('/read/newsletterById', getNewsletterById);
newsletterRouter.post('/add/newsletter',  addNewsletter);
newsletterRouter.delete('/delete/newsletter' , deleteNewsletterById)
newsletterRouter.patch('/add/newsletter/email' , updateNewsletterEmails)

export default newsletterRouter;