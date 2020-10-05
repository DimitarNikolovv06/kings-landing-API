import express, { Application } from "express";
import config from "./utils/config";
import mongoose from "mongoose";
import tweetsRouter from "./routes/tweets";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, unknownEndpoint } from "./utils/middleware";
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
app.use("/api/tweets", tweetsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
