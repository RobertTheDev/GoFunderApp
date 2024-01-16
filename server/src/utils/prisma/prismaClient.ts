import { PrismaClient } from '@prisma/client'

// Sets up and shares the prisma client.
const prismaClient: PrismaClient = new PrismaClient()

export default prismaClient
