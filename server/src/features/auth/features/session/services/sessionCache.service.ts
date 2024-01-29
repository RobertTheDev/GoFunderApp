import redisClient from '../../../../../utils/redis/redisClient.js'

export async function deleteCachedSessionBySessionId(
  sessionId: string,
): Promise<number> {
  return await redisClient.del(`session:${sessionId}`)
}
