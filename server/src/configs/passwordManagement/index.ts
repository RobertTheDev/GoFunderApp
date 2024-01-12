import argon2 from 'argon2'
import crypto from 'crypto'

const pepper = process.env.PASSWORD_PEPPER

function generateSalt(): Buffer {
  return crypto.randomBytes(32)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const passwordWithPepper = password + pepper

  return await argon2.verify(hashedPassword, passwordWithPepper)
}

export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt()

  const passwordWithPepper = password + pepper

  const hashedPassword = await argon2.hash(passwordWithPepper, { salt })

  return hashedPassword
}
