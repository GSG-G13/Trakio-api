/* eslint-disable no-unused-expressions */
import express, { Express } from 'express';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routers';
import './controllers/googleOAuth';

process.env.Node_ENV === 'development' && dotenv.config()

const app: Express = express();

app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  cors({
    origin: true,
    credentials: true,
  }),
  cookieParser(),
]);
app.use(
  session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/secure');
  },
);

app.get('/secure', (req, res) => {
  res.json({ message: 'Secure data accessed successfully!', user: req.user });
});

app.use('/api', router);

export default app;
