import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize-config.js";
import User from "./user-model.js";

const Token = sequelize.define('Token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING, 
        references: {
            model: User,
            key: 'id', 
        },
    },
});

Token.belongsTo(User, { foreignKey: 'user' });

export default Token;