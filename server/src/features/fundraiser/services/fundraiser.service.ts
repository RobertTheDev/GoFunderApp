import type { Fundraiser, Prisma } from '@prisma/client'
import prismaClient from '../../../utils/prisma/prismaClient.js'

export async function countFundraisersBySlug(slug: string): Promise<number> {
  return await prismaClient.fundraiser.count({ where: { slug } })
}

// Returns a fundraiser from prisma database.
export async function findFundraiser(
  fundraiserWhereUniqueInput: Prisma.FundraiserWhereUniqueInput,
): Promise<Fundraiser | null> {
  return await prismaClient.fundraiser.findUnique({
    where: fundraiserWhereUniqueInput,
  })
}

// Returns all fundraisers from prisma database.
export async function findFundraisers(params: {
  skip?: number
  take?: number
  cursor?: Prisma.FundraiserWhereUniqueInput
  where?: Prisma.FundraiserWhereInput
  orderBy?: Prisma.FundraiserOrderByWithRelationInput
}): Promise<Fundraiser[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.fundraiser.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function createFundraiser(
  data: Prisma.FundraiserCreateInput,
): Promise<Fundraiser> {
  return await prismaClient.fundraiser.create({
    data,
  })
}

export async function updateFundraiser(params: {
  where: Prisma.FundraiserWhereUniqueInput
  data: Prisma.FundraiserUpdateInput
}): Promise<Fundraiser> {
  const { data, where } = params
  return await prismaClient.fundraiser.update({
    data,
    where,
  })
}

export async function deleteFundraiser(
  where: Prisma.FundraiserWhereUniqueInput,
): Promise<Fundraiser> {
  return await prismaClient.fundraiser.delete({
    where,
  })
}
