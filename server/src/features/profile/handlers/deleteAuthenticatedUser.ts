import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import deleteAuthenticatedUserSchema from '../validators/deleteAuthenticatedUser.schema.js'
import { deleteUser, findUserById } from '../services/user.service.js'
import { deleteSession } from '../../auth/features/session/services/session.service.js'
import { deleteCachedUserByUsername } from '../services/userCache.service.js'

export async function deleteAuthenticatedUserHandler(
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

    const validation = await deleteAuthenticatedUserSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const findUser = await findUserById(user.id)

    if (findUser == null) {
      throw new Error(
        'There was an error trying to delete account. Please try again.',
      )
    }

    await deleteSession({ sessionId: sessionID })

    await deleteUser({ id: user.id })

    await deleteCachedUserByUsername(findUser.username)

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
