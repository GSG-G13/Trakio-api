import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import router from './routers';

const app:Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router);

export default app;
