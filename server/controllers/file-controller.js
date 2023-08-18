import filesService from "../services/files-service.js";
import ApiError from "../exceptions/api-error.js";
import uploadsConfig from "../config/uploads-config.js";
import path from "path"
import fs from "fs";
class FileController {
    async upload(req, res, next) {
        try {
            const fileData = req.file;
            const uploadedFile = await filesService.uploadFile(fileData);
            return res.json(uploadedFile);
        } catch (e) {
            next(e);
        }
    }

    async list(req, res, next) {
        try {
            const { page, list_size } = req.query;
            const files = await filesService.listFiles(page, list_size);
            return res.json(files);
        } catch (e) {
            next(e);
        }
    }

    async getFile(req, res, next) {
        try {
            const { id } = req.params;
            const file = await filesService.getFileById(id);
            if (!file) {
                throw ApiError.NotFound("File not found");
            }
            return res.json(file);
        } catch (e) {
            next(e);
        }
    }

    async deleteFile(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCount = await filesService.deleteFile(id);
            if (deletedCount === 0) {
                throw ApiError.NotFound("File not found");
            }
            return res.json({ message: "File deleted successfully" });
        } catch (e) {
            next(e);
        }
    }

    async downloadFile(req, res, next) {
        try {
            const { id } = req.params;
            const file = await filesService.getFileById(id);
            if (!file) {
                throw ApiError.NotFound("File not found");
            }
            const filePath = path.join(uploadsConfig.uploadPath, file.name + file.extension);
            
            if (!fs.existsSync(filePath)) {
                throw ApiError.NotFound("File not found");
            }

            res.setHeader('Content-Disposition', `attachment; filename=${file.name}${file.extension}`);
            res.setHeader('Content-Type', file.mimeType);
            
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (e) {
            next(e);
        }
    }
    async updateFile(req, res, next) {
        try {
            const { id } = req.params;
            const fileData = req.file;
            console.log(req.file);
            const result = await filesService.updateFile(id, fileData);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

}

const fileController = new FileController();

export default fileController;