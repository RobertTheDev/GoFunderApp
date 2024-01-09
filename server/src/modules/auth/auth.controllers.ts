import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { hashPassword } from 'src/configs/passwordManagement'
import winstonLogger from 'src/utils/winston/winstonLogger'

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const password = await hashPassword('password')

    req.session.user = { name: 'Bob' }

    res.send({ password })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}

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
