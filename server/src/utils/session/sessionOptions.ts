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
    maxAge: 60 * 60 * 24 * 30,
    // domain: '',
    path: '/',
  },
}

export default sessionConfig
