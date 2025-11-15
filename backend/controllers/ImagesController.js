import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
//Khai báo thủ công
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUpload = async (req, res) => {
  if (req.files.length === 0) {
    return res.status(400).json({
      message: "Không có file ảnh",
    });
  }

  const updateImagesPaths = req.files.map((file) => path.basename(file.path));
  res.status(201).json({
    message: "Đã tải ảnh lên thành công",
    files: updateImagesPaths,
  });
};

const viewImage = async (req, res) => {
  const { fileImage } = req.params;
  const imagePath = path.join(path.join(__dirname, "../upload/"), fileImage);
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    if (error) {
      return res.status(404).json({
        message: "Không có ảnh",
      });
    }
    res.sendFile(imagePath);
  });
};

export { imageUpload, viewImage };
