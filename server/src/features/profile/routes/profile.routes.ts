import { type RequestHandler, Router } from 'express'
import deleteProfileHandler from '../handlers/deleteProfile.js'
import getProfileHandler from '../handlers/getProfile.js'
import updateProfileHandler from '../handlers/updateProfile.js'
import updateProfileAvatarHandler from '../handlers/updateProfileAvatar.js'
import avatarUpload from '../../../utils/fileUpload/avatarUpload.js'
import { ensureUserIsAuthenticated } from '../../../features/auth/middlewares/auth.middlewares.js'

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
  '/avatar',
  ensureUserIsAuthenticated as RequestHandler,
  avatarUpload.single('avatar'),
  updateProfileAvatarHandler as RequestHandler,
)

profileRouter.put(
  '/update-profile',
  ensureUserIsAuthenticated as RequestHandler,
  updateProfileHandler as RequestHandler,
)

export default profileRouter
