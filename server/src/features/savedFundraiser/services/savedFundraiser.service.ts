import type { Prisma, SavedFundraiser } from '@prisma/client'
import prismaClient from '../../../utils/prisma/prismaClient'

export async function findSavedFundraiser(
  savedFundraiserWhereInput: Prisma.SavedFundraiserWhereInput,
): Promise<SavedFundraiser | null> {
  return await prismaClient.savedFundraiser.findFirst({
    where: savedFundraiserWhereInput,
  })
}

export async function findSavedFundraisers(params: {
  skip?: number
  take?: number
  cursor?: Prisma.SavedFundraiserWhereUniqueInput
  where?: Prisma.SavedFundraiserWhereInput
  orderBy?: Prisma.SavedFundraiserOrderByWithRelationInput
}): Promise<SavedFundraiser[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.savedFundraiser.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include: {
      fundraiser: true,
    },
  })
}

export async function createSavedFundraiser({
  fundraiserId,
  userId,
}: {
  fundraiserId: string
  userId: string
}): Promise<SavedFundraiser> {
  return await prismaClient.savedFundraiser.create({
    data: { userId, fundraiserId },
  })
}

export async function deleteSavedFundraiser(
  where: Prisma.SavedFundraiserWhereUniqueInput,
): Promise<SavedFundraiser> {
  return await prismaClient.savedFundraiser.delete({
    where,
  })
}
