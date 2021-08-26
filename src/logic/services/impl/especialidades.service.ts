import { Especialidad } from '@data/entities/especialidad.entity';
import { EspecialidadesRepository } from '@data/repositories/especialidades.repository';
import { injectable } from "inversify";
import { getCustomRepository } from 'typeorm';
import { IService } from '../interfaces/IService.interface';

@injectable()
export class EspecialidadesService implements IService<Especialidad> {
  async all(): Promise<Especialidad[]> {
    const especialidadesRepository = getCustomRepository(EspecialidadesRepository);
    return await especialidadesRepository.find();
  }

  async findOne(id: string): Promise<Especialidad | undefined> {
    const especialidadesRepository = getCustomRepository(EspecialidadesRepository);
    return await especialidadesRepository.findOne(id);
  }
}