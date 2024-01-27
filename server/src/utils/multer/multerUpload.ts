import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadImage = multer({ storage })

export default uploadImage
