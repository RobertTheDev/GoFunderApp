import type { SessionOptions } from 'express-session'
import redisClient from '../redis/redisClient.js'
import RedisStore from 'connect-redis'
import type IProfile from '../../interfaces/Profile.js'

const redisSessionStore: RedisStore = new RedisStore({
  client: redisClient,
  prefix: 'session:',
  ttl: 60 * 60 * 24 * 30,
})

declare module 'express-session' {
  interface SessionData {
    mfaVerified: Date | null
    user: IProfile
  }
}

const sessionConfig: SessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: true,
    secure: false,
  },
  name: 'gofunder-session-token',
  resave: false,
  saveUninitialized: false,
  secret: String(process.env.SESSION_SECRET),
  store: redisSessionStore,
}

export default sessionConfig
