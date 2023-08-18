import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js'; 

const FileModel = sequelize.define('File', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default FileModel;