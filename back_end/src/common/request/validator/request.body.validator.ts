// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { NextFunction, Request, Response } from "express";
// export function RequestBodyValidator(
//   type: any
// ): (req: Request, res: Response, next: NextFunction) => void {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // const error: ValidationError[] = [];
//     const data = plainToInstance(type, req.body);
//     console.log("This is Data: ", data);
//     validate(data).then((error) => {
//       if (error.length > 0) {
//         res.send(error);
//       } else {
//         req.body = data;
//         next();
//       }
//     });
//   };
// }
