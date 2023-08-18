import dotenv from 'dotenv'
import express  from 'express';
import cors  from 'cors';
import cookieParser  from 'cookie-parser'
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js';
import sequelize from './config/sequelize-config.js';
import { EXPRESS_APP_PORT } from './config/vars-config.js';
dotenv.config()
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');

        await sequelize.sync();
        app.listen(EXPRESS_APP_PORT, () => console.log(`Server started on PORT = ${EXPRESS_APP_PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
