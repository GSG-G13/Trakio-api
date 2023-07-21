/* eslint-disable no-unused-expressions */
import express, { Express } from 'express';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routers';
import './controllers/googleOAuth';
import { getUserById } from './database/query';

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
app.use(
  session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id:number, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
