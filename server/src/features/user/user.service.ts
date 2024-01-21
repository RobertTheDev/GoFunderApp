import { type Prisma, PrismaClient } from '@prisma/client'

export class UserService {
  private readonly prisma = new PrismaClient()

  async countUserByUniqueField(username: string): Promise<number> {
    return await this.prisma.user.count({ where: { username } })
  }

  // Returns a user from prisma database.
  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<{
    id: string
    annonymous: boolean
    createdAt: Date
    defaultCurrency: string
    name: string
    image: string | null
    mfaType: string | null
    totalCharitesOwned: number
    totalDonationsAmount: number
    totalDonationsMade: number
    totalFundraisersOwned: number
  } | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        annonymous: true,
        createdAt: true,
        defaultCurrency: true,
        image: true,
        mfaType: true,
        name: true,
        totalCharitesOwned: true,
        totalDonationsAmount: true,
        totalDonationsMade: true,
        totalFundraisersOwned: true,
      },
    })
  }

  // Returns all users from prisma database.
  async findUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<
    Array<{
      id: string
      annonymous: boolean
      createdAt: Date
      defaultCurrency: string
      name: string
      image: string | null
      mfaType: string | null
      totalCharitesOwned: number
      totalDonationsAmount: number
      totalDonationsMade: number
      totalFundraisersOwned: number
    }>
  > {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        annonymous: true,
        createdAt: true,
        defaultCurrency: true,
        image: true,
        mfaType: true,
        name: true,
        totalCharitesOwned: true,
        totalDonationsAmount: true,
        totalDonationsMade: true,
        totalFundraisersOwned: true,
      },
    })
  }
}
