import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationConstants } from '@core/constants/validation';
import { BusinessError } from '../../core/common/business-error';
import { singleResponse } from '../../core/common/responses';
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  let code = 500;
  let response: any;
  if (err instanceof BusinessError) {
    code = err.code
    response = singleResponse(err.message, false);
  } else if (err instanceof Array && err[0] instanceof ValidationError) {
    code = 400;
    let message: unknown[] = [];
    err.forEach(validationError => {
      const field = validationError.property;
      const erroObj: any = { field, message: [] }
      for (const validationMessage of Object.values(validationError.constraints)) {
        erroObj.message.push(validationMessage)
        message.push(erroObj);
      }
    });
    response = singleResponse(message, false);
  } else if (err.message.includes("Duplicate")) {
    err.message = ValidationConstants.MESSAGE_RESPONSE_DUPLICATE;
    response = singleResponse(err.message , false);
  } else {
    response = singleResponse(err.message, false);
  }
  res.status(code).send(response);
}