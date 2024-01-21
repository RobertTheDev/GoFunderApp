import type { RequestHandler } from 'express'
import { Router } from 'express'
import sendPasswordReset from '../controllers/sendPasswordReset.js'
import { sendEmailVerification } from '../../auth/features/emailPassword/controllers/sendEmailVerificationToken.js'

// Sets up the email router.
const emailRouter = Router()

// Defines the email routes.
emailRouter.post(
  '/send-email-verification',
  sendEmailVerification as RequestHandler,
)
emailRouter.post('/send-password-reset', sendPasswordReset as RequestHandler)

export default emailRouter
