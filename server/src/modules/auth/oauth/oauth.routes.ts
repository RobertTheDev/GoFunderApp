import { type RequestHandler, Router } from 'express'
import {
  signInWithAmazon,
  signInWithGithub,
  signInWithGoogle,
} from './oauth.controllers'

const oauthRouter = Router()

oauthRouter.get('/amazon/:code', signInWithAmazon as RequestHandler)
oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)
oauthRouter.get('/google/:accessToken', signInWithGoogle as RequestHandler)

export default oauthRouter
