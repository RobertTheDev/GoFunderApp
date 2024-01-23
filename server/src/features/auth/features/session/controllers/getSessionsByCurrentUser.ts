import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import type ResponseBody from '../../../../../interfaces/ResponseBody'
import { findSessions } from '../services/session.service'

export async function getSessionsByCurrentUser(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session } = req
  const { user } = session
  try {
    if (user == null || user === undefined) {
      throw new Error('You are not signed in to perform this action.')
    }
    const currentDate = new Date()

    const sessions = await findSessions({
      where: {
        userId: user.id,
        expires: {
          gt: currentDate.toISOString(),
        },
      },
    })

    // Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found sessions from the database.',
      data: sessions,
    })
  } catch (error) {
    next(error)
  }
}
