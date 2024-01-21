import { type RequestHandler, Router } from 'express'
import { signInWithAmazonHandler } from './controllers/amazonOauth'
import { signInWithFacebook } from './controllers/facebookOauth'
import { signInWithGithub } from './controllers/githubOauth'
import { signInWithGoogle } from './controllers/googleOauth'

const oauthRouter = Router()

oauthRouter.get('/amazon/:code', signInWithAmazonHandler as RequestHandler)
oauthRouter.get('/facebook/:code', signInWithFacebook as RequestHandler)
oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)
oauthRouter.get('/google/:code', signInWithGoogle as RequestHandler)

export default oauthRouter
