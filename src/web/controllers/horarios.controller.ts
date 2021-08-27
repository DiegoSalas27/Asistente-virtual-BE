import { resultResponse, StringUtils } from '@core/common';
import { ValidationConstants } from '@core/constants/validation';
import { HorariosService } from "@logic/services/impl";
import { NextFunction, Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";

@controller("/horarios")
export class HorariosController {
  private readonly entityName = "Horarios";

  constructor(private readonly _service: HorariosService) {}

  @httpGet("/:doctorId?")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorId = +req.params.doctorId;
      const [result, count] = await this._service.all(doctorId);

      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS, this.entityName);
      const response = resultResponse(count, message, true, result);

      res.status(200).send(response);

    } catch (error) {
      next(error);
    }
  }
}
