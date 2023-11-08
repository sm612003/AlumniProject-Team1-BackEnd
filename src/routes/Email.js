import express from 'express'
import { contactEmail } from '../controllers/Email.js'

const emailRouter = express.Router()

emailRouter.post('/api/sendContactEmail' , contactEmail)

export default emailRouter ;