import redisClient from '../../utils/redis/redisClient.js'

export class CacheService {
  private readonly cache = redisClient

  randomAddedSeconds = Math.floor(Math.random() * 120) + 1

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

  async setForTenMinutes(key: string, value: any): Promise<string | null> {
    return await this.cache.set(key, JSON.stringify(value), {
      EX: 60 + this.randomAddedSeconds,
    })
  }

  async setForOneHour(key: string, value: any): Promise<string | null> {
    return await this.cache.set(key, JSON.stringify(value), {
      EX: 3600 + this.randomAddedSeconds,
    })
  }

  async setForOneDay(key: string, value: any): Promise<string | null> {
    return await this.cache.set(key, JSON.stringify(value), {
      EX: 86400 + this.randomAddedSeconds,
    })
  }

  async delete(key: string): Promise<number> {
    return await this.cache.del(key)
  }
}
