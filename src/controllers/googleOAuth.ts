/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
} from '../database';

passport.use(
  new GoogleStrategy(
    {
      clientID: '142741150441-0frc52jrapsfr6mku7rqs3c3jvjiptuc.apps.googleusercontent.com',
      clientSecret: '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',
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
