/* eslint-disable no-unused-expressions */
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routers';

dotenv.config();

const app: Express = express();

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
  cookieParser(),
]);

process.env.Node_ENV === 'development' && app.use(morgan('dev'));
app.use('/api', router);

export default app;
