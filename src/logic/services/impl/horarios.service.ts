import { Horario } from "@data/entities/horario.entity";
import { HorariosRepository } from "@data/repositories/horarios.repository";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";
import { GetHorariosDto } from "../../dtos/horarios/get-especialidad.dto";

@injectable()
export class HorariosService implements IService<GetHorariosDto> {
  async all(doctorId?: number): Promise<[GetHorariosDto[], number]> {
    try {
      const horariosRepository = getCustomRepository(HorariosRepository);
      let horarios: [Horario[], number];
      if (doctorId) {
        horarios = await horariosRepository.findAndCount({
          doctorId
        });
      } else {
        horarios = await horariosRepository.findAndCount();
      }

      horarios![0].forEach((horario) => {
        let base_time_inicio = "00:00";
        let base_time_fin = "00:00";

        const horaInicio = (horario.hora_inicio / 60).toString();
        const horaFin = (horario.hora_fin / 60).toString();

        switch (horaInicio.length) {
          case 2:
            base_time_inicio = horaInicio + base_time_inicio.slice(2);
            break;
          case 3:
            base_time_inicio =
              horaInicio.slice(0, -1) + base_time_inicio.slice(2);
            base_time_inicio =
              base_time_inicio.slice(0, -2) + horaInicio.slice(3);
            break;
          case 4:
            base_time_inicio =
              horaInicio.slice(0, -2) + base_time_inicio.slice(2);
            base_time_inicio =
              base_time_inicio.slice(0, -2) + horaInicio.slice(3) + "0";
            break;
        }

        switch (horaFin.length) {
          case 2:
            base_time_fin = horaFin + base_time_fin.slice(2);
            break;
          case 3:
            base_time_fin = horaFin.slice(0, -1) + base_time_fin.slice(2);
            base_time_fin = base_time_fin.slice(0, -2) + horaFin.slice(3);
            break;
          case 4:
            base_time_fin = horaFin.slice(0, -2) + base_time_fin.slice(2);
            base_time_fin = base_time_fin.slice(0, -2) + horaFin.slice(3) + "0";
            break;
        }

        horario.hora_inicio_fix = base_time_inicio;
        horario.hora_fin_fix = base_time_fin;
      });
      if (horarios![1]) {
        return GetHorariosDto.fromMany(horarios![0], horarios![1]);
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
