import { IsNumber, IsString } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  customerName: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  operationCode: number;

  @IsNumber()
  tableNumber: number;
}
