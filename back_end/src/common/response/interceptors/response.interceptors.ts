import { NextFunction, Request, Response } from "express";
import { RESPONSE_META } from "../constants/response.constant";
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
        path: req.baseUrl + req.path,
        message: res[RESPONSE_META.RESPONSE_MESSAGE],
        data: incomingData,
      };
      return originalResponse.call(this, response);
    } else {
      return originalResponse.call(this, incomingData);
    }
  };
  next();
}
