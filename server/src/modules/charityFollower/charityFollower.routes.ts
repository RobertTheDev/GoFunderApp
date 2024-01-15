import { type RequestHandler, Router } from 'express'
import { followCharity } from './controllers/followCharity'
import { getUserFollowedCharities } from './controllers/getUserFollowedCharities'

const charityFollowerRouter: Router = Router()

charityFollowerRouter.get('/', getUserFollowedCharities as RequestHandler)
charityFollowerRouter.post(
  '/follow/:charityId',
  followCharity as RequestHandler,
)

export default charityFollowerRouter
