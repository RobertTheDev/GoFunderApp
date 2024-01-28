import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export default async function updateProfileAvatarHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const {
    session: { user },
  } = req

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully updated your profile avatar.',
      data: null,
    })
  } catch (error: unknown) {
    next(error)
  }
}
