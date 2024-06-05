import { NextFunction, Request, Response } from "express";
import { IResponse } from "../interfaces/response.interface";

export function ResponseInterCeptor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: IResponse<any> = {
    date: new Date(),
    path: req.url,
    message: "",
    data: "",
  };
}
