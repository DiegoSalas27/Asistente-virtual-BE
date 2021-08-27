import { EntityRepository, Repository } from "typeorm";
import { Horario } from '../entities';

@EntityRepository(Horario)
export class HorariosRepository extends Repository<Horario> {}