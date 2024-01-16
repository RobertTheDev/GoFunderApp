import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger.js'

export async function ensureUserIsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.session.user == null) {
      res.send({
        message: 'You must be signed in to perform this action.',
      })
    } else {
      next()
    }
  } catch (error) {
    winstonLogger.error(error)

    res.send(error)
  }
}

export async function ensureUserIsNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.session.user == null) {
      next()
    } else {
      res.send({ message: 'You are already signed in.' })
    }
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
