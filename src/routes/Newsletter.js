import  express  from "express";
import {
  getAllNewsletters,
  getNewsletterById,
  addNewsletter,
  deleteNewsletterById,
  updateNewsLetter,
} from "../controllers/Newsletter.js";
import {
  authenticateUser,
  authorizeUser
} from "../middlewares/auth.js";

const newsletterRouter = express.Router()

newsletterRouter.get('/read/newsletter', getAllNewsletters);
newsletterRouter.get('/read/newsletterById', getNewsletterById);
newsletterRouter.post(
  "/add/newsletter",
  authenticateUser,
  authorizeUser(["admin"]),
  addNewsletter
);
newsletterRouter.delete(
  "/delete/newsletter",
  authenticateUser,
  authorizeUser(["admin"]),
  deleteNewsletterById
);
// newsletterRouter.patch('/add/newsletter/email' , updateNewsletterEmails)
newsletterRouter.patch(
  "/update/newsletter",
  authenticateUser,
  authorizeUser(["admin"]),
  updateNewsLetter
);
export default newsletterRouter;