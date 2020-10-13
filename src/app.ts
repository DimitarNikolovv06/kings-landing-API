import express, { Application } from "express";
import config from "./utils/config";
import mongoose from "mongoose";
import tweetsRouter from "./routes/tweets";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import cors from "cors";
import morgan from "morgan";
// import testRouter from './routes/test'
import jwt from 'express-jwt'
import { errorHandler, unknownEndpoint } from "./utils/middleware";
import { getToken } from "./utils/auth";
const app: Application = express();

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected!"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(jwt({secret: config.SECRET, getToken: getToken, algorithms: ['HS256'] }).unless({path: ['/api/login', '/api/users/register']}))
app.use("/api/tweets", tweetsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
// app.use('/test',testRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
