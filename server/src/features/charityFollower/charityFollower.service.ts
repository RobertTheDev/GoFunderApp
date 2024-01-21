import type { CharityFollower, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class CharityFollowerService {
  private readonly prisma = new PrismaClient()

  async findCharityFollower(
    charityFollowerWhereInput: Prisma.CharityFollowerWhereInput,
  ): Promise<CharityFollower | null> {
    return await this.prisma.charityFollower.findFirst({
      where: charityFollowerWhereInput,
    })
  }

  async findCharityFollowers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CharityFollowerWhereUniqueInput
    where?: Prisma.CharityFollowerWhereInput
    orderBy?: Prisma.CharityFollowerOrderByWithRelationInput
  }): Promise<CharityFollower[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.charityFollower.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createCharityFollower({
    charityId,
    userId,
  }: {
    charityId: string
    userId: string
  }): Promise<CharityFollower> {
    return await this.prisma.charityFollower.create({
      data: { userId, charityId },
    })
  }

  async deleteCharityFollower(
    where: Prisma.CharityFollowerWhereUniqueInput,
  ): Promise<CharityFollower> {
    return await this.prisma.charityFollower.delete({
      where,
    })
  }
}
