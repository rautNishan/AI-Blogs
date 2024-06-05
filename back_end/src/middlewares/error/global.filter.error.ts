import { IExceptionResponse } from "../../common/response/interfaces/response.interface";
import { HttpException } from "../../exceptions/HttpExceptions";
import { NextFunction, Request, Response } from "express";

export function GlobalExceptionFilter(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const defaultStatusCode = 500;
  const defaultMessage = "Internal Server Error";

  const statusCode =
    err instanceof HttpException ? err.statusCode : defaultStatusCode;
  const message = err instanceof HttpException ? err.message : defaultMessage;

  const response: IExceptionResponse = {
    date: new Date(),
    path: req.url,
    statusCode,
    message,
  };
  console.log("This is Response: ", response);

  res.status(statusCode).send(response);
}
