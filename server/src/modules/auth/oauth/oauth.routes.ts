import { type RequestHandler, Router } from 'express'
import { signInWithGithub, signInWithGoogle } from './oauth.controllers'

const oauthRouter = Router()

oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)
oauthRouter.get('/google/:accessToken', signInWithGoogle as RequestHandler)

export default oauthRouter
