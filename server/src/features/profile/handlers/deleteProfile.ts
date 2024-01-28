import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import deleteProfileSchema from '../validators/deleteProfile.schema.js'
import { deleteSession } from '../../auth/features/session/services/session.service.js'
import { deleteCachedProfileByUsername } from '../services/profileCache.service.js'
import { deleteProfile, findProfile } from '../services/profile.service.js'

export default async function deleteProfileHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const {
    sessionID,
    session: { user },
    body,
  } = req

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const validation = await deleteProfileSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const findUser = await findProfile(user.id)

    if (findUser == null) {
      throw new Error(
        'There was an error trying to delete account. Please try again.',
      )
    }

    await deleteSession({ sessionId: sessionID })

    await deleteProfile(user.id)

    await deleteCachedProfileByUsername(findUser.username)

    req.session.destroy((err: unknown) => {
      if (err !== undefined && err !== null) {
        throw new Error('There was an error trying to sign out.')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully deleted your account.',
        data: null,
      })
    })
  } catch (error: unknown) {
    next(error)
  }
}
