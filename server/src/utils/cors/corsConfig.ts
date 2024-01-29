import cors from 'cors'

const corsConfig = cors({
  credentials: true,
  methods: ['GET', 'DELETE', 'PATCH', 'POST', 'PUT'],
  origin: 'http://localhost:3000',
})

export default corsConfig
