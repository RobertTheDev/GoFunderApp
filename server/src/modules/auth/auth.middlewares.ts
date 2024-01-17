import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../interfaces/ResponseBody.js'

export async function ensureUserIsAuthenticated(
  req: Request,
  _res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.session.user == null) {
      throw new Error('You must be signed in to perform this action.')
    }

    next()
  } catch (error) {
    next(error)
  }
}

export async function ensureUserIsNotAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.session.user != null) {
      throw new Error('You are already signed in.')
    }

    next()
  } catch (error) {
    next(error)
  }
}
