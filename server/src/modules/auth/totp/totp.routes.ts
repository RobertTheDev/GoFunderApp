import { type RequestHandler, Router } from 'express'
import {
  generateTotpSecret,
  generateTotpToken,
  verifyTotpToken,
} from './totp.controllers'

const totpRouter = Router()

totpRouter.post('/get-secret', generateTotpSecret as RequestHandler)
totpRouter.post('/get-token', generateTotpToken as RequestHandler)
totpRouter.post('/verify-token', verifyTotpToken as RequestHandler)

export default totpRouter
