import { IExceptionResponse } from "../interfaces/response.interface";
import { DatabaseException } from "../../../exceptions/database-exception";
import { HttpException } from "../../../exceptions/http-exceptions";
import { NextFunction, Request, Response } from "express";

export function GlobalExceptionFilter(
  err: HttpException | DatabaseException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("This is Global Error Filter: ", err);
  const defaultStatusCode = 500;
  const defaultMessage = "Internal Server Error";

  const statusCode =
    err instanceof HttpException ? err.statusCode : defaultStatusCode;
  const message =
    err instanceof HttpException
      ? err.message
      : err instanceof DatabaseException
      ? err.message
      : defaultMessage;

  const response: IExceptionResponse = {
    date: new Date(),
    path: req.url,
    statusCode,
    message,
  };
  return res.status(statusCode).send(response);
}