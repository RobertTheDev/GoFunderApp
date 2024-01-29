import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getFundraisersOwnedByUserHandler } from '../handlers/getFundraisersOwnedByUser.js'
import { getOwnersByFundraiserIdHandler } from '../handlers/getOwnersByFundraiser.js'

// Sets up the fundraiser owner router.
const fundraiserOwnerRouter: Router = Router()

// Defines the fundraiser owner routes.
fundraiserOwnerRouter.get(
  '/user',
  getFundraisersOwnedByUserHandler as RequestHandler,
)
fundraiserOwnerRouter.get(
  '/fundraiser/:fundraiserId',
  getOwnersByFundraiserIdHandler as RequestHandler,
)

export default fundraiserOwnerRouter
