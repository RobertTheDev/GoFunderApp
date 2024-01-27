import { type RequestHandler, Router } from 'express'
import { generateTotpSecret } from '../handlers/generateTotpSecret'
import { verifyTotpCode } from '../handlers/verifyTotpCode'

const totpRouter = Router()

totpRouter.get('/generate-secret', generateTotpSecret as RequestHandler)
totpRouter.post('/verify-code', verifyTotpCode as RequestHandler)

export default totpRouter
