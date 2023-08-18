import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js'; // Adjust the path accordingly

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;