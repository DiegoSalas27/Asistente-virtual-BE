import { DBContext } from "@data/db.context";
import { Doctor } from "@data/entities/doctor.entity";
import { DoctoresRepository } from "@data/repositories/doctores.repository";
import { CreateDoctorDto, GetDoctorDto, UpdateDoctorDto } from "@logic/dtos";
import { injectable } from "inversify";
import { DeleteResult, getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";

@injectable()
export class DoctoresService implements IService<Doctor> {
  constructor(private readonly _database: DBContext) {}

  async all(): Promise<[Doctor[], number]> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const doctores = await doctoresRepository.createQueryBuilder("d")
        .innerJoinAndSelect("d.especialidad", "e")
        .leftJoinAndSelect("d.horarios", "h")
        .leftJoinAndSelect("d.citasMedicas", "c")
        .getManyAndCount();

      if (doctores[1]) {
        return GetDoctorDto.fromMany(doctores[0], doctores[1]);
      }
      return [[], 0];
    } catch(error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<Doctor | undefined> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const doctor = await doctoresRepository.findOne({id}, {
        relations: ['especialidad', 'horarios', 'citasMedicas']
      });

      if (doctor) {
        return GetDoctorDto.from(doctor);
      } 
      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Partial<Doctor>> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const createdDoctor: Partial<Doctor> = await doctoresRepository.save(
        createDoctorDto
      );

      return CreateDoctorDto.from(createdDoctor);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne(updateDoctorDto: UpdateDoctorDto): Promise<Partial<Doctor> | null> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const result = await doctoresRepository.update(
        {
          id: updateDoctorDto.id,
        },
        updateDoctorDto
      );

      if (result.affected == 0) {
        return null;
      }

      const savedDoctor = await doctoresRepository.findOne({
        id: updateDoctorDto.id,
      });

      return UpdateDoctorDto.from(savedDoctor as Partial<Doctor>);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const result: DeleteResult = await doctoresRepository.delete(id);

      return result;
    } catch(error) {
      return Promise.reject(error);
    }
  }
}
