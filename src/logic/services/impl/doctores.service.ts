import { DoctoresRepository } from "@data/repositories/doctores.repository";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { Doctor } from '@data/entities/doctor.entity';
import { IService } from '../interfaces/IService.interface';
import { DBContext } from '@data/db.context';
import { CreateDoctorDto } from "../../dtos/create-doctor.dto";

@injectable()
export class DoctoresService implements IService<Doctor> {
  constructor(private readonly _database: DBContext) {}

  async all(): Promise<Doctor[]> {
    const doctoresRepository = getCustomRepository(DoctoresRepository);
    return await doctoresRepository.find();
  }

  async findOne(id: string): Promise<Doctor | undefined> {
    const doctoresRepository = getCustomRepository(DoctoresRepository);
    return await doctoresRepository.findOne(id);
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const doctoresRepository = getCustomRepository(DoctoresRepository);
    const createdDoctor: Partial<Doctor> = await doctoresRepository.save(createDoctorDto);

    return CreateDoctorDto.from(createdDoctor);
  }
}