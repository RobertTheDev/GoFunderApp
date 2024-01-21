import { type RequestHandler, Router } from 'express'
import signInWithAmazonHandler from './controllers/amazonOauth'
import signInWithFacebookHandler from './controllers/facebookOauth'
import signInWithGithubHandler from './controllers/githubOauth'
import signInWithGoogleHandler from './controllers/googleOauth'

const oauthRouter = Router()

oauthRouter.get('/amazon/:code', signInWithAmazonHandler as RequestHandler)
oauthRouter.get('/facebook/:code', signInWithFacebookHandler as RequestHandler)
oauthRouter.get('/github/:code', signInWithGithubHandler as RequestHandler)
oauthRouter.get('/google/:code', signInWithGoogleHandler as RequestHandler)

export default oauthRouter
