import { type RequestHandler, Router } from 'express'
import {
  signInWithAmazon,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from './oauth.controllers.js'

const oauthRouter = Router()

oauthRouter.get('/amazon/:code', signInWithAmazon as RequestHandler)
oauthRouter.get('/facebook/:code', signInWithFacebook as RequestHandler)
oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)
oauthRouter.get('/google/:accessToken', signInWithGoogle as RequestHandler)

export default oauthRouter
