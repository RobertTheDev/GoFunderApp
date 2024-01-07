import prismaClient from "../../utils/prisma/prismaClient";
import e, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";
import redisClient from "../../utils/redis/redisClient";

export async function createCharity(req: Request, res: Response) {
  const { body } = req;

  try {
    const charity = await prismaClient.charity.create({
      data: body,
    });

    res.status(StatusCodes.CREATED).json(charity);
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}

// Gets all charities from the prisma database.
export async function getCharities(_req: Request, res: Response) {
  try {
    const cachedCharities = await redisClient.get("charities");

    if (cachedCharities) {
      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: "Successfully found charity from cache.",
        data: JSON.parse(cachedCharities),
      });
    } else {
      const charities = await prismaClient.charity.findMany();

      await redisClient.set("charities", JSON.stringify(charities));

      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: "Successfully found charities.",
        data: charities,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}

export async function getCharityById(req: Request, res: Response) {
  const {
    params: { id },
  } = req;

  try {
    const cachedCharity = await redisClient.get(id);

    if (cachedCharity) {
      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: "Successfully found charity from cache.",
        data: JSON.parse(cachedCharity),
      });
    } else {
      const charity = await prismaClient.charity.findUnique({
        where: { id },
      });

      if (!charity) {
        res.status(StatusCodes.NOT_FOUND).json({
          reason: ReasonPhrases.NOT_FOUND,
          message: "Could not find charity with that id",
          data: null,
        });
      }

      await redisClient.set(id, JSON.stringify(charity));

      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: "Successfully found charity from database.",
        data: charity,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}

export async function updateCharityById(req: Request, res: Response) {
  const {
    body,
    params: { id },
  } = req;

  try {
    const updatedCharity = await prismaClient.charity.update({
      data: body,
      where: { id },
    });

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: "Successfully updated charity.",
      data: updatedCharity,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}

export async function deleteCharityById(req: Request, res: Response) {
  const {
    params: { id },
  } = req;

  try {
    await prismaClient.charity.delete({
      where: { id },
    });

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: "Successfully deleted charity.",
      data: null,
    });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
}
