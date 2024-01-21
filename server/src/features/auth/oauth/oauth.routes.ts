import { type RequestHandler, Router } from 'express'
import { signInWithAmazon } from './controllers/amazonOauth'
import { signInWithFacebook } from './controllers/facebookOauth'
import { signInWithGithub } from './controllers/githubOauth'
import { signInWithGoogle } from './controllers/googleOauth'

const oauthRouter = Router()

oauthRouter.get('/amazon/:code', signInWithAmazon as RequestHandler)
oauthRouter.get('/facebook/:code', signInWithFacebook as RequestHandler)
oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)
oauthRouter.get('/google/:accessToken', signInWithGoogle as RequestHandler)

export default oauthRouter
