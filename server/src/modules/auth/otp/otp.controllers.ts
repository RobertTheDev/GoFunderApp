import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from 'src/utils/winston/winstonLogger'
import type { Request, Response } from 'express'
import { generateMfaToken, verifyMfaToken } from 'src/configs/mfaHandlers'
import { generateOtpSchema, verifyOtpSchema } from './otp.validators'

export async function generateOtpToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await generateOtpSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    const { mobilePhoneNumber, secret } = validation.data

    // STEP 2: Generate the MFA token using the secret.
    const otpToken = generateMfaToken(secret)

    if (otpToken === null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'The secret entered is incorrect.',
        data: null,
      })
    }

    // STEP 3: Send token using mobile phone number.
    winstonLogger.info(`Token: ${otpToken.token} && ${mobilePhoneNumber}`)

    // STEP 4: Return success message.
    return res.json({
      message: 'Successfully generated token.',
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function verifyTotpToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await verifyOtpSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    const { token } = validation.data

    const verifyResult = verifyMfaToken('secret', token)

    if (verifyResult === null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        data: null,
      })
    }

    if (verifyResult.delta === 0) {
      return res.json({
        message: 'Successfully generated token.',
      })
    } else if (verifyResult.delta < 0) {
      return res.json({
        message: 'Successfully generated token.',
      })
    } else {
      return res.json({
        message: 'Successfully generated token.',
      })
    }
  } catch (error) {
    winstonLogger.error(error)

    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
