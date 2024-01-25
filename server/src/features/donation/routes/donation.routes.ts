import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getDonationsByFundraiserIdHandler } from '../handlers/getDonationsByFundraiserId'
import { getDonationsByUserIdHandler } from '../handlers/getDonationsByUserId'
import { getDonationsByCurrentUserHandler } from '../handlers/getDonationsByCurrentUser'
import { createDonationHandler } from '../handlers/createDonation'

const donationRouter: Router = Router()

donationRouter.get(
  '/current-user',
  getDonationsByCurrentUserHandler as RequestHandler,
)

donationRouter.get(
  '/fundraiser/:id',
  getDonationsByFundraiserIdHandler as RequestHandler,
)

donationRouter.get('/user/:id', getDonationsByUserIdHandler as RequestHandler)

donationRouter.post(
  '/create/:fundraiserId',
  createDonationHandler as RequestHandler,
)

export default donationRouter
