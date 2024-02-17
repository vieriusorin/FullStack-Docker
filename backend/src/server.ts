import express, { Request, Response, NextFunction } from 'express';
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { errorMiddleware } from './middlewares';
import { signInRouter } from './routes/signIn/signIn';
import { signUpRouter } from './routes/signUp/signUp';

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

app.use(errorMiddleware)

export default app;