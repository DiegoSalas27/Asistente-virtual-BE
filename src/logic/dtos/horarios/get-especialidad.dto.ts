import { NumberSchema } from '@hapi/joi';
import { Horario } from '../../../data/entities/horario.entity';
export class GetHorariosDto {
  constructor(
    private readonly id: number,
    private readonly doctorId: number,
    private readonly hora_inicio: string,
    private readonly hora_fin: string,
  ) {}

  static from(entity: Horario) {
    return new GetHorariosDto(entity.id, entity.doctorId, entity.hora_inicio_fix, entity.hora_fin_fix);
  }

  static fromMany(horarios: Horario[], count: number): [GetHorariosDto[], number] {
    const docs: GetHorariosDto[] = horarios.map(horario => GetHorariosDto.from(horario));
    return [
      docs,
      count
    ]
  }
}