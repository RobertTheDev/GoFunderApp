import multer from 'multer'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/avatar-images')
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now() // Get current timestamp
    const extension = file.originalname.split('.').pop() // Get file extension
    const newFileName = `${file.originalname}${timestamp}.${extension}`
    cb(null, newFileName)
  },
})

const avatarUpload: multer.Multer = multer({ storage })

export default avatarUpload
