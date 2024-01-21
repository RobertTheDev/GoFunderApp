import { type RequestHandler, Router } from 'express'
import { generateTotpSecret } from '../controllers/generateTotpSecret'
import { verifyTotpCode } from '../controllers/verifyTotpCode'

const totpRouter = Router()

totpRouter.get('/generate-secret', generateTotpSecret as RequestHandler)
totpRouter.post('/verify-code', verifyTotpCode as RequestHandler)

export default totpRouter
