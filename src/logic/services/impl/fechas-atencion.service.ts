import { DBContext } from "@data/db.context";
import { FechaAtencion } from '@data/entities/fecha_atencion.entity';
import { FechasAtencionRepository } from "@data/repositories";
import { CreateFechaAtencionDto } from "@logic/dtos";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";

@injectable()
export class FechasAtencionService implements IService<FechaAtencion> {
  constructor(private readonly _database: DBContext) {}

  async all(): Promise<[FechaAtencion[], number]> {
    try {
      const fechasAtencionRepository = getCustomRepository(FechasAtencionRepository);
      const fechas = await fechasAtencionRepository.findAndCount()
      
      return fechas;
    } catch(error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<FechaAtencion | undefined> {
    try {
      const fechasAtencionRepository = getCustomRepository(FechasAtencionRepository);
      const fecha = await fechasAtencionRepository.findOne(id);

      return fecha;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async findOneByHorarioAtencion({ horarioId, fecha: f }: CreateFechaAtencionDto): Promise<FechaAtencion | undefined> {
    try {
      const fechasAtencionRepository = getCustomRepository(FechasAtencionRepository);
      const fecha = await fechasAtencionRepository.findOne({
        horarioId: horarioId,
        fecha: f,
      });

      return fecha;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createFechaAtencionDto: CreateFechaAtencionDto): Promise<Partial<FechaAtencion>> {
    try {
      const fechasAtencionRepository = getCustomRepository(FechasAtencionRepository);
      const fecha_atencion_exists = await this.findOneByHorarioAtencion(createFechaAtencionDto);

      if (fecha_atencion_exists) {
        throw new Error('El doctor ya tiene una cita reservada en esta fecha. Por favor, elija otra fecha de atención.');
      }

      const createdFechaAtencion: Partial<FechaAtencion> = await fechasAtencionRepository.save(
        createFechaAtencionDto
      );

      return createdFechaAtencion;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
