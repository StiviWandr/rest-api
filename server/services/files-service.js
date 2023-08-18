import FileModel from '../models/file-model.js'; 
import fs from "fs"
import path from 'path'
import uploadsConfig from '../config/uploads-config.js';
class FilesService {
    async uploadFile(fileData) {
        try {
            const file = await FileModel.create({
                name: fileData.originalname,
                extension: path.extname(fileData.originalname),
                mimeType: fileData.mimetype,
                size: fileData.size,
                uploadDate: new Date(),
                filePath: fileData.filename 
            });
            
            return file.toJSON();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async listFiles(page = 1, listSize = 10) {
        try {
            const offset = (page - 1) * listSize;
            const files = await FileModel.findAll({
                limit: listSize,
                offset,
                attributes: ['id', 'name', 'extension', 'mimeType', 'size', 'uploadDate']
            });
            return files;
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }

    async getFileById(id) {
        try {
            const file = await FileModel.findByPk(id);
            return file ? file.toJSON() : null;
        } catch (error) {
            console.error('Error getting file by ID:', error);
            throw error;
        }
    }

    async deleteFile(id) {
        try {
            const file = await FileModel.findByPk(id);
            if (!file) {
                throw new Error("File not found");
            }
            console.log(file);
            const filePath = path.join(uploadsConfig.uploadPath, file.filePath);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await file.destroy();
            return { message: "File deleted successfully" };
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async updateFile(id, fileData) {
        try {
            const previousFile = await FileModel.findByPk(id);
            if (!previousFile) {
                throw new Error('Previous file not found');
            }

            const previousFilePath = path.join(uploadsConfig.uploadPath, previousFile.filePath);
            
            await fs.unlinkSync(previousFilePath)
            console.log(fileData);
            await FileModel.update(
                {
                    name: fileData.originalname,
                    extension: path.extname(fileData.originalname),
                    mimeType: fileData.mimetype,
                    size: fileData.size,
                    uploadDate: new Date(),
                    filePath: fileData.filename
                },
                { where: { id } }
            );
            const result = await FileModel.findByPk(id);
            return { message: 'File updated successfully', file: result};
        } catch (error) {
            console.error('Error updating file:', error);
            throw error;
        }
    }
}

const filesService = new FilesService();

export default filesService;