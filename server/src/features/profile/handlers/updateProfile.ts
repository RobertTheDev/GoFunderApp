import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import updateProfileSchema from '../validators/updateProfile.schema.js'
import { updateProfile } from '../services/profile.service.js'

export default async function updateProfileHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const {
    session: { user },
    body,
  } = req

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const validation = await updateProfileSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const updatedProfile = updateProfile(user.id, validation.data)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully updated your profile.',
      data: updatedProfile,
    })
  } catch (error: unknown) {
    next(error)
  }
}
