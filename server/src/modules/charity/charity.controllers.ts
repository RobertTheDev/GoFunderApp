import prismaClient from "../../utils/prisma/prismaClient";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";

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
    const charities = await prismaClient.charity.findMany();

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: "Successfully found charities.",
      data: charities,
    });
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
    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: "Successfully found charity.",
      data: charity,
    });
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
