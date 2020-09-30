import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

export const unknownEndpoint = (_req: Request, res: Response) =>
  res.send({ err: "Not Found!" }).status(404).end();

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "CastError") {
    return res.status(400).json({ message: err.message, name: err.name }).end();
  } else if (err.name === "TypeError") {
    return res.status(400).json({ message: err.message, name: err.name }).end();
  }

  next(err);
};
