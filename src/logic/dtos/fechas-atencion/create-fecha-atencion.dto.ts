import { ValidationConstants } from '@core/constants/validation';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFechaAtencionDto {
  //data to receive

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly fecha: string;

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly horarioId: number;
}