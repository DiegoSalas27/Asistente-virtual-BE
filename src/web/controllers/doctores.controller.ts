import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { DoctoresService } from '@logic/services/impl';
import { ValidateRequestMiddleware } from '../middlewares';
import { CreateDoctorDto } from '@logic/dtos';
import { ValidationConstants } from '@core/constants/validation';
import { StringUtils, singleResponse } from '@core/common';

@controller('/doctores')
export class DoctoresController {
  private readonly entityName: 'Doctores';

  constructor(private readonly _service: DoctoresService) {}

  @httpGet('/')
  async index(req: Request, res: Response) {
    const doctores = await this._service.all();

    return res.json(doctores);
  }

  @httpGet('/:id')
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const doctor = await this._service.findOne(id)

    return res.json(doctor);
  }

  @httpPost('/', ValidateRequestMiddleware.with(CreateDoctorDto))
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.create(req.body);

      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_POST_SUCCESS, this.entityName);
      const response = singleResponse(message, true, result);

      res.status(200).send(response);

    } catch (error) {
      return next(error)
    }
    
  }
}