import prismaClient from "../../utils/prisma/prismaClient";
import { Request, Response } from "express";

// Gets all charities from the prisma database.
export async function getCharities(_req: Request, res: Response) {
  try {
    const charities = await prismaClient.charity.findMany();

    res.json(charities);
  } catch (error) {
    console.error(error);
  }
}
