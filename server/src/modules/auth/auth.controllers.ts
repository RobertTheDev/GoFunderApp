import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../interfaces/ResponseBody.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export async function getAuthenticatedUser(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session } = req
  const { user } = session

  try {
    if (user == null) {
      throw new Error('You are not signed in to perform this action.')
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

export async function signOut(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  try {
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
