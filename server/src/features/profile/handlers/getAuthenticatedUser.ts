import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export async function getAuthenticatedUserHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session } = req
  const { user, mfaVerified } = session

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    if (user.mfaType != null && mfaVerified == null) {
      throw new Error('You have set up MFA and need to verify.')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found authenticated user.',
      data: user,
    })
  } catch (error: unknown) {
    next(error)
  }
}
