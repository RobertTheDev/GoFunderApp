import { type RequestHandler, Router } from 'express'
import { getUserSavedFundraisersHandler } from '../handlers/getUserSavedFundraisers'
import { saveFundraiserHandler } from '../handlers/saveFundraiser'

const savedFundraiserRouter: Router = Router()

savedFundraiserRouter.get('/', getUserSavedFundraisersHandler as RequestHandler)

savedFundraiserRouter.post(
  '/save/:fundraiserId',
  saveFundraiserHandler as RequestHandler,
)

export default savedFundraiserRouter
