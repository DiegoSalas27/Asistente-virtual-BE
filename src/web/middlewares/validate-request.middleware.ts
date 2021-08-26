import { Response, Request, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { BaseMiddleware } from "../lib/base-middleware";
import { validate } from "class-validator";

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(private readonly _dtoClass: any) {
    super();
  }

  public async execute(
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const dto = plainToClass(this._dtoClass, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return next(errors);
    }

    req.body = dto;
    next();
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto).execute;
  }
}
