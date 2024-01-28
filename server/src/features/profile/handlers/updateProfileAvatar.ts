import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { updateProfileAvatar } from '../services/profile.service.js'

export default async function updateProfileAvatarHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const {
    session: { user },
    file,
  } = req

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    if (file == null) {
      throw new Error('No file')
    }

    const updatedUser = await updateProfileAvatar(user.id, file.filename)

    req.session.user = updatedUser

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully updated your profile avatar.',
      data: updatedUser,
    })
  } catch (error: unknown) {
    next(error)
  }
}
