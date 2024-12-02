import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';

export class QueueResponseDto {
  @IsString()
  customerName: string;

  @IsString()
  phoneNumber: string;

  @IsObject()
  operation: {
    name: string;
    description: string;
    operationCode: number;
    timeToComplete: number;
  };

  @IsNumber()
  tableNumber: number;

  @IsNumber()
  assignedTime: number;

  @IsDate()
  createdAt: Date;
}
