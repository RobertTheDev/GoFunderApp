import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winstonLogger from 'src/utils/winston/winstonLogger'

export async function signUp(_req: Request, res: Response): Promise<void> {
  try {
    res.send('hello')
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
