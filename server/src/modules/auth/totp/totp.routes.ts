import { type RequestHandler, Router } from 'express'
import { generateTotpSecret, verifyTotpToken } from './totp.controllers'

const totpRouter = Router()

totpRouter.post('/get-secret', generateTotpSecret as RequestHandler)
totpRouter.post('/verify-token', verifyTotpToken as RequestHandler)

export default totpRouter
