import type { Prisma, Session } from '@prisma/client'
import prismaClient from '../../../../../utils/prisma/prismaClient'

export default async function createSession(
  data: Prisma.SessionCreateManyInput,
): Promise<Session> {
  return await prismaClient.session.create({
    data,
  })
}

export async function deleteSession(
  where: Prisma.SessionWhereUniqueInput,
): Promise<Session> {
  return await prismaClient.session.delete({
    where,
  })
}

export async function deleteSessions(
  where: Prisma.SessionWhereInput,
): Promise<Prisma.BatchPayload> {
  return await prismaClient.session.deleteMany({
    where,
  })
}

export async function findSession(
  sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
): Promise<Session | null> {
  return await prismaClient.session.findUnique({
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
  return await prismaClient.session.findMany({
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
  return await prismaClient.session.update({
    data,
    where,
  })
}
