import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getDonationsByFundraiserIdHandler } from '../handlers/getDonationsByFundraiserId.js'
import { getDonationsByUserIdHandler } from '../handlers/getDonationsByUserId.js'
import { getDonationsByCurrentUserHandler } from '../handlers/getDonationsByCurrentUser.js'
import { createDonationHandler } from '../handlers/createDonation.js'

const donationRouter: Router = Router()

donationRouter.get(
  '/current-user',
  getDonationsByCurrentUserHandler as RequestHandler,
)

donationRouter.get(
  '/fundraiser/:fundraiserId',
  getDonationsByFundraiserIdHandler as RequestHandler,
)

donationRouter.get(
  '/user/:userId',
  getDonationsByUserIdHandler as RequestHandler,
)

donationRouter.post(
  '/create/:fundraiserId',
  createDonationHandler as RequestHandler,
)

export default donationRouter
