import { cacheTtlOneDay } from 'src/configs/cacheTtl'
import redisClient from 'src/utils/redis/redisClient'

export class CacheService {
  private readonly cache = redisClient

  async get(key: string): Promise<string | null> {
    return await this.cache.get(key)
  }

  async set(params: {
    key: string
    value: any
    expiry: number
  }): Promise<string | null> {
    const { key, value, expiry } = params

    return await this.cache.set(key, JSON.stringify(value), { EX: expiry })
  }

  async setForOneDay(key: string, value: any): Promise<string | null> {
    return await this.cache.set(key, JSON.stringify(value), {
      EX: cacheTtlOneDay,
    })
  }

  async delete(key: string): Promise<number> {
    return await this.cache.del(key)
  }
}
