import type { NextFunction, Request, Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'
import logger from '../../utils/logger/index.js'

const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  logger.error(error.message)

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const status: number = error.status || 400

  response.status(status).json({
    success: false,
    status: getReasonPhrase(status),
    message: error.message,
    data: null,
  })
}

export default errorHandler
