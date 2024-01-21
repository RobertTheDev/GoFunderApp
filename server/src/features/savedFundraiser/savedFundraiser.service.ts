import type { Prisma, SavedFundraiser } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class SavedFundraiserService {
  private readonly prisma = new PrismaClient()

  async findSavedFundraiser(
    savedFundraiserWhereInput: Prisma.SavedFundraiserWhereInput,
  ): Promise<SavedFundraiser | null> {
    return await this.prisma.savedFundraiser.findFirst({
      where: savedFundraiserWhereInput,
    })
  }

  async findSavedFundraisers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.SavedFundraiserWhereUniqueInput
    where?: Prisma.SavedFundraiserWhereInput
    orderBy?: Prisma.SavedFundraiserOrderByWithRelationInput
  }): Promise<SavedFundraiser[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.savedFundraiser.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createSavedFundraiser({
    fundraiserId,
    userId,
  }: {
    fundraiserId: string
    userId: string
  }): Promise<SavedFundraiser> {
    return await this.prisma.savedFundraiser.create({
      data: { userId, fundraiserId },
    })
  }

  async deleteSavedFundraiser(
    where: Prisma.SavedFundraiserWhereUniqueInput,
  ): Promise<SavedFundraiser> {
    return await this.prisma.savedFundraiser.delete({
      where,
    })
  }
}
