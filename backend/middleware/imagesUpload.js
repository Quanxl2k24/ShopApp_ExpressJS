import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = path.join(__dirname, "../upload/");
    callback(null, destinationPath);
  },

  filename: function (req, file, callback) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    callback(null, newFileName);
  },
});

const fileFilter = function (req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Chi duoc phep tai file anh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // tooi da 10MB
  },
});

export default upload;
