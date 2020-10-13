import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

export const unknownEndpoint = (_req: Request, res: Response): void =>
  res.send({ err: "Not Found!" }).status(404).end();

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ ...err })
      .end();
  } else if (err.name === "TypeError") {
    return res
      .status(400)
     .send({ error: err.message, name: err.name, stack: err.stack }); 
  } else if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ ...err })
      .end();
  } else if (err.name === "MongooseError") {
    return res
      .status(400)
      .send({ error: err.message, name: err.name, stack: err.stack });
  } else if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .send({ ...err })
      .end();
  } else if(err.name === "UnauthorizedError"){
      return res
      .status(401)
      .send({ ...err })
      .end();
  }

  next(err);
};
