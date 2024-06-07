import { IExceptionResponse } from "../../common/response/interfaces/response.interface";
import { DatabaseException } from "../../exceptions/DataBaseException";
import { HttpException } from "../../exceptions/HttpExceptions";
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
  res.status(statusCode).send(response);
}
