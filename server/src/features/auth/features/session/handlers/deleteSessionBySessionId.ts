import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import { deleteSession, findSession } from '../services/session.service.js'
import { deleteCachedSessionBySessionId } from '../services/sessionCache.service.js'

export async function deleteSessionBySessionId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params, session } = req
  const { sessionId } = params
  const { user } = session
  try {
    if (user == null || user === undefined) {
      throw new Error('You are not signed in to perform this action.')
    }

    if (sessionId == null || sessionId === undefined) {
      throw new Error('No session ID was provided.')
    }

    const session = await findSession({ sessionId })

    if (session == null) {
      throw new Error('No session was found with that id.')
    }

    if (session.userId !== user.id) {
      throw new Error('You are not authorised to delete this session.')
    }

    await deleteSession({ sessionId })

    await deleteCachedSessionBySessionId(sessionId)

    // Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully deleted the session.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
