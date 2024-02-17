import express, { Request, Response, NextFunction } from 'express';
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { errorMiddleware } from './middlewares';
import { signInRouter } from './routes/auth/signIn/signIn';
import { signUpRouter } from './routes/auth/signUp/signUp';
import { usersRouter } from './routes/users';
import { categoryRouter } from './routes/category';

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(signUpRouter)

app.use(signInRouter)

app.use(usersRouter)

app.use(categoryRouter)

app.use(errorMiddleware)

export default app;