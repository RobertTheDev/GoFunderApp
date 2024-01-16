import type { NextFunction, Request, Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger.js'

const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  // Error handling middleware functionality
  winstonLogger.error(error.message) // log the error

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const status: number = error.status || 400
  // send back an easily understandable error message to the caller
  response.status(status).json({
    success: false,
    status: getReasonPhrase(status),
    message: error.message,
    data: null,
  })
}

export default errorHandler
