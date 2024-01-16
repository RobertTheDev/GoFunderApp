import multer, { type Multer } from 'multer'

const multerUpload: Multer = multer({ dest: 'uploads/' })

export default multerUpload
