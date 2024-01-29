import { type RequestHandler, Router } from 'express'
import { getUserSavedFundraisersHandler } from '../handlers/getUserSavedFundraisers.js'
import { saveFundraiserHandler } from '../handlers/saveFundraiser.js'

const savedFundraiserRouter: Router = Router()

savedFundraiserRouter.get('/', getUserSavedFundraisersHandler as RequestHandler)

savedFundraiserRouter.post(
  '/save/:fundraiserId',
  saveFundraiserHandler as RequestHandler,
)

export default savedFundraiserRouter
