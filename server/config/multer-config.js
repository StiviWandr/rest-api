import pathConfig from './uploads-config.js';
import multer from 'multer';
import {nanoid} from "nanoid";
import * as path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathConfig.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

export const upload = multer({storage})