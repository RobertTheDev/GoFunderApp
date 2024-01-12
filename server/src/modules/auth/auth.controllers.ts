import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger'

export async function getAuthenticatedUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { user } = req.session

    res.send({ user })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function signOut(req: Request, res: Response): Promise<void> {
  try {
    req.session.destroy((err: any) => {
      if (err !== undefined && err !== null) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
