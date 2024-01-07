import { PrismaClient } from "@prisma/client";

// Sets up and shares the prisma client.
const prismaClient = new PrismaClient();

export default prismaClient;
