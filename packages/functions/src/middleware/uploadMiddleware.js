import multer from '@koa/multer';
import path from 'path';
//options to limit file size and file extension

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
export const upload = multer({
  storage: storage
});
