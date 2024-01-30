import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getFundraisersOwnedByUserHandler } from '../handlers/getFundraisersOwnedByUser.js'
import { getOwnersByFundraiserIdHandler } from '../handlers/getOwnersByFundraiser.js'
import { isFundraiserOwnerByFundraiserIdHandler } from '../handlers/isFundraiserOwnerByFundraiserId.js'
import { isFundraiserOwnerByFundraiserSlugHandler } from '../handlers/isFundraiserOwnerByFundraiserSlug.js'

// Sets up the fundraiser owner router.
const fundraiserOwnerRouter: Router = Router()

// Defines the fundraiser owner routes.
fundraiserOwnerRouter.get(
  '/fundraiser/:fundraiserId',
  getOwnersByFundraiserIdHandler as RequestHandler,
)

fundraiserOwnerRouter.get(
  '/user',
  getFundraisersOwnedByUserHandler as RequestHandler,
)

fundraiserOwnerRouter.get(
  '/check-fundraiser-owner/id/:fundraiserId',
  isFundraiserOwnerByFundraiserIdHandler as RequestHandler,
)

fundraiserOwnerRouter.get(
  '/check-fundraiser-owner/:slug',
  isFundraiserOwnerByFundraiserSlugHandler as RequestHandler,
)

export default fundraiserOwnerRouter
