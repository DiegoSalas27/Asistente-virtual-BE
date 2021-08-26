import { EspecialidadesService } from '@logic/services/impl';
import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";

@controller('/especialidades')
export class EspecialidadesController {
  constructor(private readonly _service: EspecialidadesService) {}

  @httpGet('/')
  async index(req: Request, res: Response) {
    const especialidades = await this._service.all();

    return res.json(especialidades);
  }

  @httpGet('/:id')
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const especialidad = await this._service.findOne(id)

    return res.json(especialidad);
  }
}