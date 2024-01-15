import { type RequestHandler, Router } from 'express'
import { getUserSavedFundraisers } from './controllers/getUserSavedFundraisers'
import { saveFundraiser } from './controllers/saveFundraiser'

const savedFundraiserRouter: Router = Router()

savedFundraiserRouter.get('/', getUserSavedFundraisers as RequestHandler)
savedFundraiserRouter.post(
  '/save/:fundraiserId',
  saveFundraiser as RequestHandler,
)

export default savedFundraiserRouter
