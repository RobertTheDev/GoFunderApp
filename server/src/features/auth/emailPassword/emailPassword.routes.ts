import { type RequestHandler, Router } from 'express'
import { signInWithEmailAndPassword } from './controllers/signInWithEmailAndPassword.js'
import { verifyEmailWithToken } from './controllers/verifyEmailWithToken.js'
import { sendEmailVerification } from './controllers/sendEmailVerificationToken.js'
import signUpWithEmailAndPassword from './controllers/signUpWithEmailAndPassword.js'

const emailPasswordRouter: Router = Router()

emailPasswordRouter.post(
  '/send-email-verification',
  sendEmailVerification as RequestHandler,
)

emailPasswordRouter.post(
  '/sign-in',
  signInWithEmailAndPassword as RequestHandler,
)

emailPasswordRouter.post(
  '/sign-up',
  signUpWithEmailAndPassword as RequestHandler,
)

emailPasswordRouter.post(
  '/verify-email',
  verifyEmailWithToken as RequestHandler,
)

export default emailPasswordRouter