import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares';
import { signInRouter } from './routes/auth/signIn/signIn';
import { signUpRouter } from './routes/auth/signUp/signUp';
import { usersRouter } from './routes/users';
import { categoryRouter } from './routes/category';
import { taskRouter } from './routes/task/task';
import { googleLoginRouter } from './routes/auth/google';
import * as passportConfig from './middlewares/passport'
const session = require('express-session');
const cookieSession = require('cookie-session');
import prisma from "./db";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Optimize for production
  saveUninitialized: false,
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     keys: [process.env.SESSION_SECRET],
//   })
// );

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: 'none',
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//   })
// );

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          }
        })
        if (existingUser) {
          return done(null, existingUser)
        } else {
          const newUser = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              username: profile.username
            }
          });
          return done(null, newUser)
        }
      } catch (error) {
        console.error('Error authenticating with Google:', error);
        done(error, null);
      } finally {
        await prisma.$disconnect();
      }
    }
  )
);

app.use(passport.session());
app.use(passport.initialize());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(googleLoginRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(taskRouter);
app.use(errorMiddleware);

export default app;
