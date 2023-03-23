import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import posts from './routers/posts.js'
import users from './routers/users.js'
import departments from './routers/departments.js'
import category from './routers/category.js'
import topics from './routers/topics.js'
import comments from './routers/comments.js'
import subcomments from './routers/subcomments.js'
import actions from './routers/actionLogs.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import roles from './routers/role.js'
import { v2 as cloudinary } from 'cloudinary'
import { fileURLToPath } from 'url'
import path from 'path'
import cookieParser from 'cookie-parser'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.port || 5000
const URI =
  'mongodb+srv://admin:NwDpWtA8h7d0GpMH@cluster1.yp9solp.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb' }))
app.use(morgan('combined'))
app.use(cookieParser())
const allowOrigin = ['http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin: allowOrigin,
  allowedHeaders: [
    'Origin',
    'Content-Type',
    'Accept',
    'x-access-token',
    'authorization',
    'x-signature',
  ],
  methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
}
app.use(cors(corsOptions))

app.use('/posts', posts)
app.use('/users', users)
app.use('/roles', roles)
app.use('/departments', departments)
app.use('/category', category)
app.use('/topics', topics)
app.use('/comments', comments)
app.use('/subcomments', subcomments)
app.use('/actions', actions)
app.get('/', (req, res) => {
  res.send('SUCCESS')
  console.log('SUCCESS')
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT)
    })
  })
  .catch((err) => {
    console.log('ERR', err)
  })
