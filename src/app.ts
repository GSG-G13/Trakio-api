import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import router from './routers';

const app:Express = express();

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]);

app.use('/api', router);

export default app;
