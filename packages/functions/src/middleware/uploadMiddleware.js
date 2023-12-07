import multer from 'koa-multer-esm';
import path from 'path';
//options to limit file size and file extension

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
export const upload = multer({
  storage: storage
});

export const uploadMiddleware = async (ctx, next) => {
  try {
    await upload.single('file');
    await next();
  } catch (e) {
    console.log(e);
  }
};
