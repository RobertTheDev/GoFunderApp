import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getFundraisersOwnedByUserHandler } from '../handlers/getFundraisersOwnedByUser'
import { getOwnersByFundraiserIdHandler } from '../handlers/getOwnersByFundraiser'

// Sets up the fundraiser owner router.
const fundraiserOwnerRouter = Router()

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
