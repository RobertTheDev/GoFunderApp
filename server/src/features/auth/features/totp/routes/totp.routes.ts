import { type RequestHandler, Router } from 'express'
import { generateTotpSecret } from '../handlers/generateTotpSecret.js'
import { verifyTotpCode } from '../handlers/verifyTotpCode.js'

const totpRouter: Router = Router()

totpRouter.get('/generate-secret', generateTotpSecret as RequestHandler)
totpRouter.post('/verify-code', verifyTotpCode as RequestHandler)

export default totpRouter
