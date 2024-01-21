import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'

export async function uploadImage(req: Request, res: Response): Promise<void> {
  try {
    winstonLogger.info(JSON.stringify(req.file))

    res.send({ message: 'Image uploaded' })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
