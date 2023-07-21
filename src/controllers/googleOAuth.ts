/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
  getUserById,
} from '../database';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET_KEY!,
      callbackURL: 'http://localhost:3000/auth/callback',
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void,
    ) => {
      getUserDataQuery(profile.emails[0].value)

        .then((queryResult) => {
          let user = queryResult.rows[0];
          if (!user) {
            const { displayName, emails } = profile;
            const name = displayName;
            const email = emails ? emails[0].value : '';
            const phone = '0599999999';
            const password = '1234567890';
            emailExistsQuery(email)
              .then((emailExistsResult) => {
                const emailExists = emailExistsResult.rows[0].exists;
                if (emailExists) {
                  return done(new Error('Email already registered.'), null);
                }
                signupQuery({
                  name, email, password, phone,
                })
                  .then((signupResult) => {
                    // eslint-disable-next-line prefer-destructuring
                    user = signupResult.rows[0];
                    return done(null, user);
                  })
                  .catch((error) => done(error));
              })
              .catch((error) => done(error));
          } else {
            return done(null, user);
          }
        })
        .catch((error) => done(error));
    },
  ),
);
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
