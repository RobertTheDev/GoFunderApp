import prismaClient from "../../utils/prisma/prismaClient";
import { Request, Response } from "express";

export async function createCharity(req: Request, res: Response) {
  const { body } = req;

  try {
    const charity = await prismaClient.charity.create({
      data: body,
    });

    res.json(charity);
  } catch (error) {
    console.error(error);
  }
}

// Gets all charities from the prisma database.
export async function getCharities(_req: Request, res: Response) {
  try {
    const charities = await prismaClient.charity.findMany();

    res.json(charities);
  } catch (error) {
    console.error(error);
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

    res.json(charity);
  } catch (error) {
    console.error(error);
  }
}
