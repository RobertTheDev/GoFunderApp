import twoFactor from 'node-2fa'

export function generateMfaSecret(account: string): {
  secret: string
  uri: string
  qr: string
} {
  return twoFactor.generateSecret({
    name: 'GoFunder',
    account,
  })
}

export function generateMfaToken(secret: string): {
  token: string
} | null {
  return twoFactor.generateToken(secret)
}

export function verifyMfaToken(
  secret: string,
  token: string,
): { delta: number } | null {
  return twoFactor.verifyToken(secret, token)
}
