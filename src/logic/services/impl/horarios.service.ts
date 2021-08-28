import { Horario } from "@data/entities/horario.entity";
import { HorariosRepository } from "@data/repositories/horarios.repository";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";
import { GetHorariosDto } from "../../dtos/horarios/get-especialidad.dto";
import { transformHHMM } from "../../../core/common/utils";

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

      transformHHMM(horarios);
      
      if (horarios![1]) {
        return GetHorariosDto.fromMany(horarios![0], horarios![1]);
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
