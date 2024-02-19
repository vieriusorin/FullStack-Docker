import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from "helmet";
import compression from 'compression';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares';
import { signInRouter } from './routes/auth/signIn/signIn';
import { signUpRouter } from './routes/auth/signUp/signUp';
import { usersRouter } from './routes/users';
import { categoryRouter } from './routes/category';
import { taskRouter } from './routes/task/task';
import { googleLoginRouter } from './routes/auth/google';
import prisma from "./db";
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const xss = require('xss-clean');

const app = express();

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Optimize for production
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Set the session cookie expiration time (1 hour in this example)
    httpOnly: true,
  },
}));

app.use(passport.session());
app.use(passport.initialize());

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

app.use(cors());

app.options('*', cors());

// Use Helmet!
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.isAuthenticated())
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(compression());

app.use(googleLoginRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(taskRouter);
app.use(errorMiddleware);

export default app;
