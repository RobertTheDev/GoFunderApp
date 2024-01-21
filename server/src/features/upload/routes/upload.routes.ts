import type { RequestHandler } from 'express'
import { Router } from 'express'
import { uploadImage } from '../upload.controllers.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

// const upload = multer({ dest: 'uploads/' })

// Sets up the upload router.
const uploadRouter = Router()

// Defines the upload routes.
uploadRouter.post(
  '/upload-image',
  upload.single('avatar'),
  uploadImage as RequestHandler,
)

export default uploadRouter
