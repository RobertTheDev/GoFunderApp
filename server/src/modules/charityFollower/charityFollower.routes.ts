import { type RequestHandler, Router } from 'express'
import { followCharity } from './controllers/followCharity.js'
import { getUserFollowedCharities } from './controllers/getUserFollowedCharities.js'

const charityFollowerRouter: Router = Router()

charityFollowerRouter.get('/', getUserFollowedCharities as RequestHandler)
charityFollowerRouter.post(
  '/follow/:charityId',
  followCharity as RequestHandler,
)

export default charityFollowerRouter
