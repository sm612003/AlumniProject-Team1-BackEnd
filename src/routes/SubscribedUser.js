// Import necessary modules and controllers
import express from 'express';
import { createSubscribedUser, getAllSubscribedUsers, getSubscribedUserById, deleteSubscribedUser,getSubscribersMonthly,getSubscribedUserByEmail} from '../controllers/SubscribedUser.js';

const subscribedrouter = express.Router();


// Define routes
subscribedrouter.post('/add/subscribedUsers' ,createSubscribedUser);
subscribedrouter.get('/getall/subscribedUsers', getAllSubscribedUsers);
subscribedrouter.get('/subscribedUsers/:id', getSubscribedUserById);
subscribedrouter.delete('/delete/subscribedUsers/:id', deleteSubscribedUser);
subscribedrouter.get('/getSubscribersMonthly', getSubscribersMonthly);
subscribedrouter.get('/getSubscribedUserByEmail/:email', getSubscribedUserByEmail);

// router.put('/subscribedUsers/:id', updateSubscribedUser);

export default subscribedrouter;
