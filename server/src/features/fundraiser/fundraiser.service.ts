import type { Fundraiser, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class FundraiserService {
  private readonly prisma = new PrismaClient()

  // Returns a fundraiser from prisma database.
  async findFundraiser(
    fundraiserWhereUniqueInput: Prisma.FundraiserWhereUniqueInput,
  ): Promise<{
    id: string
    createdAt: Date
    category: string
    charityId: string | null
    deadlineDate: Date | null
    defaultCurrency: string
    headline: string
    image: string
    name: string
    slug: string
    target: number
    totalDonations: number
    totalRaised: number
    userId: string | null
  } | null> {
    return await this.prisma.fundraiser.findUnique({
      where: fundraiserWhereUniqueInput,
      select: {
        id: true,
        charity: true,
        charityId: true,
        createdAt: true,
        category: true,
        deadlineDate: true,
        defaultCurrency: true,
        description: true,
        donations: {
          select: {
            id: true,
            createdAt: true,
            amount: true,
            message: true,
            user: {
              select: {
                id: true,
                image: true,
                name: true,
                createdAt: true,
                totalFundraisersOwned: true,
                totalCharitesOwned: true,
              },
            },
          },
        },
        headline: true,
        image: true,
        name: true,
        slug: true,
        target: true,
        totalDonations: true,
        totalRaised: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            createdAt: true,
            totalFundraisersOwned: true,
            totalCharitesOwned: true,
          },
        },
        userId: true,
      },
    })
  }

  // Returns all fundraisers from prisma database.
  async findFundraisers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.FundraiserWhereUniqueInput
    where?: Prisma.FundraiserWhereInput
    orderBy?: Prisma.FundraiserOrderByWithRelationInput
  }): Promise<
    Array<{
      id: string
      createdAt: Date
      category: string
      deadlineDate: Date | null
      defaultCurrency: string
      headline: string
      image: string
      name: string
      slug: string
      target: number
      totalDonations: number
      totalRaised: number
    }>
  > {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.fundraiser.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        createdAt: true,
        category: true,
        deadlineDate: true,
        defaultCurrency: true,
        donations: true,
        headline: true,
        image: true,
        name: true,
        slug: true,
        target: true,
        totalDonations: true,
        totalRaised: true,
      },
    })
  }

  async createFundraiser(
    data: Prisma.FundraiserCreateInput,
  ): Promise<Fundraiser> {
    return await this.prisma.fundraiser.create({
      data,
    })
  }

  async updateFundraiser(params: {
    where: Prisma.FundraiserWhereUniqueInput
    data: Prisma.FundraiserUpdateInput
  }): Promise<Fundraiser> {
    const { data, where } = params
    return await this.prisma.fundraiser.update({
      data,
      where,
    })
  }

  async deleteFundraiser(
    where: Prisma.FundraiserWhereUniqueInput,
  ): Promise<Fundraiser> {
    return await this.prisma.fundraiser.delete({
      where,
    })
  }
}
