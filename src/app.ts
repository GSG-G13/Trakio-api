import express, { Request, Response, Express } from 'express';
import cookieParser from 'cookie-parser';

const app:Express = express();

app.use([
  express.json(),
  express.urlencoded({extended:false}),
  cookieParser(),
]);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello there');
});

export default app;
