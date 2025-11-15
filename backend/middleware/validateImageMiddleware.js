import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
//Khai báo thủ công
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validateImageMiddleware = (req, res, next) => {
  const { image } = req.body;

  if (image && !image.startsWith("http:/") && !image.startsWith("https:/")) {
    const imagePath = path.join(__dirname, "../upload", image);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        message: "Không có file ảnh này",
      });
    }
  }

  next();
};

export default validateImageMiddleware;
