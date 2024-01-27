import cors from 'cors'

const corsConfig = cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'DELETE', 'PATCH', 'POST', 'PUT'],
  credentials: true,
})

export default corsConfig
