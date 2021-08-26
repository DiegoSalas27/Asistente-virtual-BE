import { Doctor } from '@data/entities/doctor.entity';
import { Especialidad } from '@data/entities';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ValidationConstants } from '@core/constants/validation';
export class GetDoctorDto {
  constructor(
    private readonly especialidad: Especialidad | null,
    private readonly especialidadId: number,
    private readonly nombres: string,
    private readonly apellidos: string,
  ) {}

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly id: number;

  static from(entity: Doctor) {
    return {...entity}
  }

  static fromMany(doctores: Doctor[], count: number): [Doctor[], number] {
    const docs: Doctor[] = doctores.map(doctor => GetDoctorDto.from(doctor));
    return [
      docs,
      count
    ]
  }
}