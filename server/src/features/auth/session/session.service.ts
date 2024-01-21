import type { Prisma, Session } from '@prisma/client'
import prismaClient from 'src/utils/prisma/prismaClient'

export default async function createSession(
  data: Prisma.SessionCreateInput,
): Promise<Session> {
  return prismaClient.session.create({
    data,
  })
}

export async function deleteSession(
  where: Prisma.SessionWhereUniqueInput,
): Promise<Session> {
  return prismaClient.session.delete({
    where,
  })
}

export async function findSession(
  sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
): Promise<Session | null> {
  return prismaClient.session.findUnique({
    where: sessionWhereUniqueInput,
  })
}

export async function findSessions(params: {
  skip?: number
  take?: number
  cursor?: Prisma.SessionWhereUniqueInput
  where?: Prisma.SessionWhereInput
  orderBy?: Prisma.SessionOrderByWithRelationInput
}): Promise<Session[]> {
  const { skip, take, cursor, where, orderBy } = params
  return prismaClient.session.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function updateSession(params: {
  where: Prisma.SessionWhereUniqueInput
  data: Prisma.SessionUpdateInput
}): Promise<Session> {
  const { data, where } = params
  return prismaClient.session.update({
    data,
    where,
  })
}
