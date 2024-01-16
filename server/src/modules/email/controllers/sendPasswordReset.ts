import sgMail from '@sendgrid/mail'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger'
import type { Request, Response } from 'express'

sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))

export default async function sendPasswordReset(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    await sgMail.send({
      to: 'robertthedev@gmail.com',
      from: 'roberthawker16@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })

    res.status(StatusCodes.OK).json({ message: 'Sent email.' })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
