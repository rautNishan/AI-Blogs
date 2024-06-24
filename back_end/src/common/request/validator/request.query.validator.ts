import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../../exceptions/validation-exceptions";
import { HttpStatusCode } from "../../constants/http.status.code";

export function RequestQueryValidator(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomingQuery: any = plainToInstance(type, req.query);
      const validation = await validate(incomingQuery);
      const errors: any = [];
      if (validation.length > 0) {
        for (let error of validation) {
          errors.push(error.constraints);
        }
        throw new ValidationException(
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          errors
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
