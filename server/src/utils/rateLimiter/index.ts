import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit'

const rateLimiter: RateLimitRequestHandler = rateLimit({
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  windowMs: 15 * 60 * 1000, // 15 minutes
})

export default rateLimiter
