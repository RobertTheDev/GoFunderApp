import { type RequestHandler, Router } from 'express'
import { signInWithGithub } from './oauth.controllers'

const oauthRouter = Router()

oauthRouter.get('/github/:code', signInWithGithub as RequestHandler)

export default oauthRouter
