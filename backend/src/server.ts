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
const cookieParser = require('cookie-parser');

const session = require('express-session');
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

app.use(cors());

app.options('*', cors());

// Use Helmet!
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(googleLoginRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(taskRouter);
app.use(errorMiddleware);

export default app;
