import { Response, Request, NextFunction } from 'express';
export abstract class BaseMiddleware {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  public abstract execute(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> | Response<any, Record<string, any>>
}