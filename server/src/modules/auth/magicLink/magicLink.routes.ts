import { type RequestHandler, Router } from 'express'
import { sendMagicLink, verifyMagicLink } from './magicLink.controllers'
import { ensureUserIsNotAuthenticated } from '../auth.middlewares'

const magicLinkRouter = Router()

magicLinkRouter.post(
  '/send',
  ensureUserIsNotAuthenticated as RequestHandler,
  sendMagicLink as RequestHandler,
)
magicLinkRouter.post(
  '/verify',
  ensureUserIsNotAuthenticated as RequestHandler,
  verifyMagicLink as RequestHandler,
)

export default magicLinkRouter
