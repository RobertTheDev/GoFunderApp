import { type RequestHandler, Router } from 'express'
import { getUserSavedFundraisers } from '../controllers/getUserSavedFundraisers.js'
import { saveFundraiser } from '../controllers/saveFundraiser.js'

const savedFundraiserRouter: Router = Router()

savedFundraiserRouter.get('/', getUserSavedFundraisers as RequestHandler)
savedFundraiserRouter.post(
  '/save/:fundraiserId',
  saveFundraiser as RequestHandler,
)

export default savedFundraiserRouter
