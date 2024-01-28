import { type RequestHandler, Router } from 'express'
import { ensureUserIsAuthenticated } from 'src/features/auth/middlewares/auth.middlewares'
import deleteProfileHandler from '../handlers/deleteProfile'
import getProfileHandler from '../handlers/getProfile'
import updateProfileHandler from '../handlers/updateProfile'
import updateProfileAvatarHandler from '../handlers/updateProfileAvatar'
import fileUpload from '../../../utils/fileUpload'

const profileRouter: Router = Router()

profileRouter.delete(
  '/delete-profile',
  ensureUserIsAuthenticated as RequestHandler,
  deleteProfileHandler as RequestHandler,
)

profileRouter.get(
  '/',
  ensureUserIsAuthenticated as RequestHandler,
  getProfileHandler as RequestHandler,
)

profileRouter.put(
  '/',
  ensureUserIsAuthenticated as RequestHandler,
  updateProfileHandler as RequestHandler,
)

profileRouter.put(
  '/avatar',
  ensureUserIsAuthenticated as RequestHandler,
  fileUpload.single('avatar'),
  updateProfileAvatarHandler as RequestHandler,
)

export default profileRouter
