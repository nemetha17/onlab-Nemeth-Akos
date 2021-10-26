import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    console.log(path.join(path.dirname('.'), 'upload'))
    next(null, path.join(path.dirname('.'), 'upload'))
  },
  filename: (req, file, next) => {
    next(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        file.originalname.split('.')[file.originalname.split('.').length - 1]
    )
  },
})

export const upload = multer({
  storage,
})