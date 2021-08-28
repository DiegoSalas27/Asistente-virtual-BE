import { BusinessError, resultResponse, singleResponse, StringUtils } from "@core/common";
import { ValidationConstants } from "@core/constants/validation";
import { CreateFechaAtencionDto } from '@logic/dtos';
import { FechasAtencionService } from "@logic/services/impl";
import { NextFunction, Request, Response } from "express";
import {
  controller, httpGet,
  httpPost
} from "inversify-express-utils";
import { ValidateRequestMiddleware } from "../middlewares";

@controller("/fechas-atencion")
export class FechasAtencionController {
  private readonly entityName = "Fechas atencion";

  constructor(private readonly _service: FechasAtencionService) {}

  @httpPost("/", ValidateRequestMiddleware.with(CreateFechaAtencionDto))
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.create(req.body);

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_POST_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
}
