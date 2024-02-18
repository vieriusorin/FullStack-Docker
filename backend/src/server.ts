import express, { Request, Response, NextFunction } from 'express';

import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { errorMiddleware } from './middlewares';
import { signInRouter } from './routes/auth/signIn/signIn';
import { signUpRouter } from './routes/auth/signUp/signUp';
import { usersRouter } from './routes/users';
import { categoryRouter } from './routes/category';
import { taskRouter } from './routes/task/task';
import { googleLoginRouter } from './routes/auth/google';
import { passportGoogle } from './middlewares/passport';
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const passport = require("passport");
const cookieSession = require('cookie-session');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET, //secret used to sign the session ID cookie
//     resave: true, //save session on every request 
//     saveUninitialized: true, //save uninitialized sessions (new and not modified)
//     cookie: {
//       sameSite: "none", //allow cross-site requests from different origin
//       secure: true, //requires HTTPS. For local environment you may skip this.
//       maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
//     }
//   })
// );

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET]
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportGoogle()

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});





app.use(googleLoginRouter)

app.use(signUpRouter)

app.use(signInRouter)

app.use(usersRouter)

app.use(categoryRouter)

app.use(taskRouter)

app.use(errorMiddleware)

export default app;