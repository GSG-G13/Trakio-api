import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import router from './routers';

dotenv.config()

const app:Express = express();

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cors(),
  cookieParser(),
]);

// eslint-disable-next-line no-unused-expressions
process.env.Node_ENV === 'development' && app.use(morgan('dev'))
app.use(router);

export default app;
