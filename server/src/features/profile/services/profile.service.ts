import prismaClient from '../../../utils/prisma/prismaClient'
import { type UpdateProfileSchemaType } from '../validators/updateProfile.schema'
import type IProfile from 'src/interfaces/Profile'

export async function countUsersByUsername(username: string): Promise<number> {
  return await prismaClient.user.count({ where: { username } })
}

export async function deleteProfile(userId: string): Promise<IProfile | null> {
  return await prismaClient.user.delete({
    where: {
      id: userId,
    },
  })
}

const profilePrismaSelectOptions = {
  annonymous: true,
  createdAt: true,
  defaultCurrency: true,
  email: true,
  emailVerified: true,
  image: true,
  id: true,
  mfaType: true,
  name: true,
  totalCharitesOwned: true,
  totalDonationsAmount: true,
  totalDonationsMade: true,
  totalFundraisersOwned: true,
  username: true,
}

export async function findProfile(userId: string): Promise<IProfile | null> {
  return await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: profilePrismaSelectOptions,
  })
}

export async function updateProfile(
  userId: string,
  data: UpdateProfileSchemaType,
): Promise<IProfile> {
  return await prismaClient.user.update({
    data,
    select: profilePrismaSelectOptions,
    where: { id: userId },
  })
}

export async function updateProfileAvatar(
  userId: string,
  avatarUrl: string,
): Promise<IProfile> {
  return await prismaClient.user.update({
    data: { image: `http://localhost:3001/avatar-images/${avatarUrl}` },
    select: profilePrismaSelectOptions,
    where: { id: userId },
  })
}
