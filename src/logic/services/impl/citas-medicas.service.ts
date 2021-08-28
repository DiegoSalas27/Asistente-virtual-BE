import { DBContext } from "@data/db.context";
import { CitaMedica } from "@data/entities";
import { CitasMedicasRepository } from "@data/repositories";
import { CreateCitaMedicaDto } from "@logic/dtos";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";
import { transformHHMMSingle } from "@core/common";

@injectable()
export class CitasMedicasService implements IService<CitaMedica> {
  constructor(private readonly _database: DBContext) {}

  async all(
    doctorId?: number,
    pacienteId?: number
  ): Promise<[CitaMedica[], number]> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const qb = citasMedicasRepository
        .createQueryBuilder("cm")
        .leftJoinAndSelect("cm.doctor", "d")
        .leftJoinAndSelect("cm.paciente", "p");

      if (doctorId) {
        qb.where(`cm.doctor_id = ${doctorId}`);
      }

      if (pacienteId) {
        qb.andWhere(`cm.paciente_id = ${pacienteId}`);
      }

      const citasMedicas = await qb.getManyAndCount();

      citasMedicas[0].forEach((cm) => {
        const [start, end] = transformHHMMSingle(cm.hora_inicio, cm.hora_fin);
        cm.hora_inicio = start as any;
        cm.hora_fin = end as any;
      });

      if (citasMedicas[1]) {
        return citasMedicas;
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<CitaMedica | undefined> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const citaMedica = await citasMedicasRepository.findOne(
        { id },
        {
          relations: ["doctor", "paciente"],
        }
      );

      if (citaMedica) {
        const [start, end] = transformHHMMSingle(
          citaMedica.hora_inicio,
          citaMedica.hora_fin
        );
        citaMedica.hora_inicio = start as any;
        citaMedica.hora_fin = end as any;
      }

      return citaMedica;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(
    createCitaMedicaDto: CreateCitaMedicaDto
  ): Promise<Partial<CitaMedica>> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const createdCitaMedica: Partial<CitaMedica> =
        await citasMedicasRepository.save(createCitaMedicaDto);

      return createdCitaMedica;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
