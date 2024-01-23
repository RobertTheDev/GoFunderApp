import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { deleteSession } from '../features/session/services/session.service.js'

export async function signOutHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { sessionID } = req

  try {
    await deleteSession({ sessionId: sessionID })

    req.session.destroy((err: unknown) => {
      if (err !== undefined && err !== null) {
        throw new Error('There was an error trying to sign out.')
      }

      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully signed out.',
        data: null,
      })
    })
  } catch (error: unknown) {
    next(error)
  }
}
