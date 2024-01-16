import type { SessionOptions } from 'express-session'
import redisClient from '../../utils/redis/redisClient'
import RedisStore from 'connect-redis'

const redisSessionStore: RedisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
  ttl: 604800,
})

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string
      createdAt: Date
      updatedAt: Date
      email: string | null
      emailVerified: Date | null
      firstName: string | null
      image: string | null
      lastName: string | null
    }
  }
}

const sessionConfig: SessionOptions = {
  store: redisSessionStore,
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
  name: 'gofunder-session-token',
  cookie: {
    // secure: true,
    secure: false,
    httpOnly: true,
    sameSite: true,
    maxAge: 604800,
    // domain: '',
    path: '/',
  },
}

export default sessionConfig
