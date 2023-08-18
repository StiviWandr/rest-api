import dotenv from "dotenv"
dotenv.config()

// Настройки mysql базы
export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_NAME = process.env.DB_NAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT)
  : 3306
// Настройка express
export const EXPRESS_APP_PORT = process.env.EXPRESS_APP_PORT