import { type RequestHandler, Router } from 'express'
import { signInWithEmailAndPassword } from '../handlers/signInWithEmailAndPassword.js'
import { changePassword } from '../handlers/changePassword.js'
import signUpWithEmailAndPasswordHandler from '../handlers/signUpWithEmailAndPassword.js'
import {
  ensureUserIsAuthenticated,
  ensureUserIsNotAuthenticated,
} from '../../../../../features/auth/middlewares/auth.middlewares.js'
import { sendPasswordResetToken } from '../handlers/sendPasswordResetToken.js'
import { resetPasswordWithToken } from '../handlers/resetPasswordWithToken.js'
import { sendEmailVerification } from '../handlers/sendEmailVerification.js'
import { verifyEmail } from '../handlers/verifyEmail.js'

const emailPasswordRouter: Router = Router()

emailPasswordRouter.post(
  '/send-email-verification',
  sendEmailVerification as RequestHandler,
  sendPasswordResetToken as RequestHandler,
)

emailPasswordRouter.post(
  '/send-password-reset',
  ensureUserIsNotAuthenticated as RequestHandler,
  sendPasswordResetToken as RequestHandler,
)

emailPasswordRouter.post(
  '/sign-in',
  ensureUserIsNotAuthenticated as RequestHandler,
  signInWithEmailAndPassword as RequestHandler,
)

emailPasswordRouter.post(
  '/sign-up',
  ensureUserIsNotAuthenticated as RequestHandler,
  signUpWithEmailAndPasswordHandler as RequestHandler,
)

emailPasswordRouter.post(
  '/verify-email/:code',
  verifyEmail as RequestHandler,
  sendPasswordResetToken as RequestHandler,
)

emailPasswordRouter.put(
  '/change-password',
  ensureUserIsAuthenticated as RequestHandler,
  changePassword as RequestHandler,
)

emailPasswordRouter.put(
  '/reset-password/:code',
  ensureUserIsNotAuthenticated as RequestHandler,
  resetPasswordWithToken as RequestHandler,
)

export default emailPasswordRouter
