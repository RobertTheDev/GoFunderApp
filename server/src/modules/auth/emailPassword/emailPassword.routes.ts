import { type RequestHandler, Router } from 'express'
import { signInWithEmailAndPassword } from './controllers/signInWithEmailAndPassword.js'
import { signUpWithEmailAndPassword } from './controllers/signUpWithEmailAndPassword.js'
import { verifyEmailWithToken } from './controllers/verifyEmailWithToken.js'
import { sendEmailVerification } from './controllers/sendEmailVerificationToken.js'
import {
  ensureUserIsAuthenticated,
  ensureUserIsNotAuthenticated,
} from '../auth.middlewares.js'

const emailPasswordRouter = Router()

emailPasswordRouter.post(
  '/sign-in',
  ensureUserIsNotAuthenticated as RequestHandler,
  signInWithEmailAndPassword as RequestHandler,
)
emailPasswordRouter.post(
  '/sign-up',
  ensureUserIsNotAuthenticated as RequestHandler,
  signUpWithEmailAndPassword as RequestHandler,
)

emailPasswordRouter.post(
  '/send-email-verification',
  ensureUserIsAuthenticated as RequestHandler,
  sendEmailVerification as RequestHandler,
)

emailPasswordRouter.post(
  '/verify-email',
  ensureUserIsAuthenticated as RequestHandler,
  verifyEmailWithToken as RequestHandler,
)

export default emailPasswordRouter
