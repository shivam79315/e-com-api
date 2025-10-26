import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
}) 

const upload = multer({storage})
export default upload;