import type { FundraiserOwner, Prisma } from '@prisma/client'
import prismaClient from '../../../utils/prisma/prismaClient.js'

// Returns a fundraiser from prisma database.
export async function findFundraiserOwner(
  fundraiserOwnerWhereUniqueInput: Prisma.FundraiserOwnerWhereUniqueInput,
): Promise<FundraiserOwner | null> {
  return await prismaClient.fundraiserOwner.findUnique({
    where: fundraiserOwnerWhereUniqueInput,
  })
}

// Returns all fundraisers from prisma database.
export async function findFundraiserOwners(params: {
  skip?: number
  take?: number
  cursor?: Prisma.FundraiserOwnerWhereUniqueInput
  where?: Prisma.FundraiserOwnerWhereInput
  orderBy?: Prisma.FundraiserOwnerOrderByWithRelationInput
}): Promise<FundraiserOwner[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.fundraiserOwner.findMany({
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

export async function createFundraiserOwner(
  data: Prisma.FundraiserOwnerCreateManyInput,
): Promise<FundraiserOwner> {
  return await prismaClient.fundraiserOwner.create({
    data,
  })
}

export async function updateFundraiserOwner(params: {
  where: Prisma.FundraiserOwnerWhereUniqueInput
  data: Prisma.FundraiserOwnerUpdateInput
}): Promise<FundraiserOwner> {
  const { data, where } = params
  return await prismaClient.fundraiserOwner.update({
    data,
    where,
  })
}

export async function deleteFundraiserOwner(
  where: Prisma.FundraiserOwnerWhereUniqueInput,
): Promise<FundraiserOwner> {
  return await prismaClient.fundraiserOwner.delete({
    where,
  })
}

export async function deleteFundraiserOwnerByFundraiserId(
  fundraiserId: string,
): Promise<Prisma.BatchPayload> {
  return await prismaClient.fundraiserOwner.deleteMany({
    where: {
      fundraiserId,
    },
  })
}
