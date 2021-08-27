import { EntityRepository, Repository } from "typeorm";
import { FechaAtencion } from '../entities';

@EntityRepository(FechaAtencion)
export class FechasAtencionRepository extends Repository<FechaAtencion> {}