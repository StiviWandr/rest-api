import { Sequelize } from "sequelize";
import { DB_NAME, DB_PASSWORD, DB_USER } from "./vars-config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: '127.0.0.1', // Your MySQL host
    dialect: 'mysql',
});

export default sequelize;