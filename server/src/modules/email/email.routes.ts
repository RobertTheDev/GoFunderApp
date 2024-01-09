import type { RequestHandler } from 'express'
import { Router } from 'express'
import { sendEmail } from './email.controllers'

// Sets up the email router.
const emailRouter = Router()

// Defines the email routes.
emailRouter.post('/send', sendEmail as RequestHandler)

export default emailRouter
