import { singleResponse, StringUtils } from "@core/common";
import { ValidationConstants } from "@core/constants/validation";
import { CreateCitaMedicaDto } from '@logic/dtos';
import { CitasMedicasService } from "@logic/services/impl";
import { NextFunction, Request, Response } from "express";
import {
  controller, httpGet,
  httpPost
} from "inversify-express-utils";
import { BusinessError } from "../../core/common/business-error";
import { resultResponse } from '../../core/common/responses';
import { ValidateRequestMiddleware } from "../middlewares";

@controller("/citas-medicas")
export class CitasMedicasController {
  private readonly entityName = "Citas Medicas";

  constructor(private readonly _service: CitasMedicasService) {}

  @httpGet("/:doctorId?/:pacienteId?")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorId = +req.params.doctorId;
      const pacienteId = +req.params.pacienteId;

      const [result, count] = await this._service.all(doctorId, pacienteId);
      
      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS, this.entityName);
      const response = resultResponse(count, message, true, result);

      res.status(200).send(response);
    } catch(error) {
      next(error);
    }
  }

  @httpGet("/:id")
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const result = await this._service.findOne(id);

      if (!result) {
        throw new BusinessError(
          StringUtils.format(
            ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
            this.entityName,
            id.toString()
          ),
          404
        );
      }

      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS, this.entityName);
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/", ValidateRequestMiddleware.with(CreateCitaMedicaDto))
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
