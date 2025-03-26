import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/errors";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      details: err.errors
    });
  } else {
    // Default error handling for unexpected errors
    res.status(500).json({
      error: "InternalServerError",
      message: "Something went wrong",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};
