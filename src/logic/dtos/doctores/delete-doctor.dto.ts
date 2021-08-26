import { ValidationConstants } from '@core/constants/validation';
import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteDoctorDto {
  //data to receive
  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly id: number;
}