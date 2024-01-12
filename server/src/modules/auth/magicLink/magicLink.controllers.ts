import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger'
import type { Request, Response } from 'express'
import prismaClient from 'src/utils/prisma/prismaClient'
import genereateId from 'src/configs/idGenerator'
import { tenMinuteExpiryDateTime } from 'src/configs/expiryManagement/dateExpiryManagement'
import {
  sendMagicLinkSchema,
  verifyMagicLinkSchema,
} from './magicLink.validators'

export async function sendMagicLink(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await sendMagicLinkSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 2: Generate Token and create verification request.
    const generatedToken = genereateId()

    await prismaClient.verificationRequest.create({
      data: {
        expires: tenMinuteExpiryDateTime,
        identifier: 'magic-link',
        token: generatedToken,
      },
    })

    // STEP 3: Send email.
    winstonLogger.info(
      `Token: ${generatedToken} & Email: ${validation.data.email}`,
    )

    // STEP 4:Send success message.
    return res.json({
      message: 'Successfully sent magic link.',
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function verifyMagicLink(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req
  try {
    // STEP 1: Verify request body.
    const validation = await verifyMagicLinkSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    const { email, token } = validation.data

    // STEP 2: Check verification request exists.
    const findVerificationRequest =
      await prismaClient.verificationRequest.findUnique({
        where: {
          token,
        },
      })

    if (findVerificationRequest === null) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Verification token is invalid.',
      })
    }

    await prismaClient.verificationRequest.delete({ where: { token } })

    // STEP 3: Find user.
    const user = await prismaClient.user.findUnique({ where: { email } })

    // STEP 4: Create user if it doesnt exist  and then sign user into session.
    if (user !== null) {
      if (user.emailVerified === null) {
        const verifiedUser = await prismaClient.user.update({
          data: { emailVerified: new Date() },
          where: { email },
        })

        req.session.user = verifiedUser
      } else {
        req.session.user = user
      }
    } else {
      const user = await prismaClient.user.create({
        data: { email, emailVerified: new Date() },
      })

      req.session.user = user
    }

    // STEP 5: Return success message.
    return res.status(StatusCodes.OK).send({
      message: 'Successfully signed in.',
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
