import { EntityRepository, Repository } from "typeorm";
import { Especialidad } from '../entities/especialidad.entity';

@EntityRepository(Especialidad)
export class EspecialidadesRepository extends Repository<Especialidad> {}