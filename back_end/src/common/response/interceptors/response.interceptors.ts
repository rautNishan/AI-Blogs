import { NextFunction, Request, Response } from "express";
import { IResponse } from "../interfaces/response.interface";

export function ResponseInterCeptor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalResponse = res.json;
  res.json = function (incomingData: Record<string, any>) {
    if (res.statusCode < 400) {
      const response: IResponse = {
        date: new Date(),
        path: req.url,
        message: "This is Message",
        data: incomingData,
      };
      return originalResponse.call(this, response);
    } else {
      return originalResponse.call(this, incomingData);
    }
  };
  next();
}
